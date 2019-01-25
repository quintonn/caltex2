var layout = (function ()
{
    var settings = null;
    var menuIsOpen = false;

    function addLayoutRegions(element, config)
    {
        //var regionIds = ['headerContainer', 'footerContainer', 'contentContainer', 'menuContainer'];
        var regionIds = ['headerContainer', 'contentContainer', 'menuContainer'];
        for (var i = 0; i < regionIds.length; i++)
        {
            var id = regionIds[i];
            var div = document.getElementById(id);
            if (div == null)
            {
                var div = document.createElement('div');
                div.id = id;
                div.className = 'menu-set menu-closed animate-menu default-menu';
                element.appendChild(div);
            }
            else
            {
                div.className += ' menu-set menu-closed animate-menu default-menu';
            }
        }

        return Promise.resolve();
    }

    function setup(rootElement)
    {
        return webUtils.retrieveOrUseCache("LAYOUT_CONFIG", function () { return layoutConfig.getConfig(); })
            //webUtils.callFunction(function () { return layoutConfig.getConfig(); })
            .then(function (res)
            {
                return addLayoutRegions(rootElement, res).then(function ()
                {
                    return layout.setMenuState(res.menuIsOpen, res.menuIsOnHeader, res.menuIsOnFooter, res.menuOverlaysContent, res.menuIsRightAlign);
                });
            })
            .catch(function (error)
            {
                console.log('super error');
                console.log(error);
            });
    }

    //setup();

    //addLayoutRegions();

    /*
     menu-open          - menu is shown
     menu-closed        - menu is not shown  (when closed, no other options are considered)
     -- must be 1 of these only

     menu-all           - menu covers header and footer
     menu-show-header     - menu does not cover header
     menu-show-footer     - menu does not cover footer
     -- must be either all, or header and/or footer, but cannot be all 3

     menu-overlay       - menu is on top of content and does not push content out of the way
     -- either present or not

     menu-right         - menu is on the right
     -- either present or not

    valid states:
    -- closed | <all | header | footer |  header+footer> + [overlay] + [right]
    
     */

    function getDefault(value, defaultValue)
    {
        value = typeof value !== 'undefined' ? value : defaultValue;
        return value;
    }

    function setMenuState(isOpen, onHeader, onFooter, overlaysContent, rightHand)
    {
        isOpen = getDefault(isOpen, false);
        onHeader = getDefault(onHeader, true);
        onFooter = getDefault(onFooter, true);
        overlaysContent = getDefault(overlaysContent, false);
        rightHand = getDefault(rightHand, false);

        menuIsOpen = isOpen;

        settings =
            {
                isOpen: isOpen,
                onHeader: onHeader,
                onFooter: onFooter,
                overlaysContent: overlaysContent,
                rightHand: rightHand
            };

        var state = isOpen ? 'menu-open' : 'menu-closed';

        if (isOpen == false)
        {
            // do nothing else to state
        }
        else
        {
            if (onHeader == true && onFooter == true)
            {
                state += ' menu-all';
            }
            else
            {
                if (onHeader == false)
                {
                    state += ' menu-show-header'
                }
                if (onFooter == false)
                {
                    state += ' menu-show-footer';
                }
            }
            if (overlaysContent == true)
            {
                state += ' menu-overlay';
            }
        }

        if (rightHand == true)
        {
            state += ' menu-right';
        }

        webUtils.log('setting menu state to ' + state, 0);
        return webUtils.updateClassCollection('menu', state);
    }

    return {
        setup: setup,
        toggleMenu: function ()
        {
            /* Check if the menu is in initial state as it may be invisible on small screens */
            var defaultMenu = document.querySelectorAll("#menuContainer.default-menu");
            
            if (defaultMenu != null && defaultMenu.length > 0)
            {
                var currentMenuState = window.getComputedStyle(defaultMenu[0]).visibility;
                if (currentMenuState == 'hidden')
                {
                    // This means the menu was not visible because on small device
                    menuIsOpen = false;
                }
            }

            var items = document.querySelectorAll('.menu-set');
            var fromClassName = menuIsOpen ? 'menu-open' : 'menu-closed';
            var toClassName = menuIsOpen ? 'menu-closed' : 'menu-open';

            var re = new RegExp('(\\s|\^)' + fromClassName + '(\\s|\$)', 'g');
            for (var i = 0; i < items.length; i++)
            {
                items[i].className = items[i].className.replace(re, ' ' + toClassName + ' ').replace('default-menu', '');
            }
            menuIsOpen = !menuIsOpen;
        },
        setMenuState: setMenuState,
    };
})();