function menuItem(id, label, cssClasses)
{
    var self = this;
    self.id = id;
    self.label = label;
    self.cssClasses = cssClasses;

    //TODO:
    self.actionOrTypeOrSomething = "TODO: this should tell me if this is a view, inputscreen, process, etc";

    if (typeof cssClasses != "undefined" && cssClasses != null)
    {
        self.cssClasses = cssClasses;
    }
    else
    {
        self.cssClasses = "";
    }

    self.getExtraClass = function ()
    {
        return self.cssClasses;
    }
}