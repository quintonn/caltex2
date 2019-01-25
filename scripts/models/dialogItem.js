function dialogItem(title, content, parameters, options)
{
    var self = this;
    self.title = title;
    self.content = content;
    self.parameters = webUtils.getValueOrDefault(parameters, {});
    self.options = options;
}