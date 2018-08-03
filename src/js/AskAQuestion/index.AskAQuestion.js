import './index.AskAQuestion.controller';


$('#textarea').textext({
    plugins : 'tags prompt focus autocomplete ajax arrow',
    tagsItems : [ 'Basic', 'JavaScript', 'PHP', 'Scala' ],
    prompt : 'Add one...',
    ajax : {
        url : '/manual/examples/data.json',
        dataType : 'json',
        cacheResults : true
    }
});