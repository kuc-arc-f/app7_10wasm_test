// LibWasmTask

/**
 * constructor
 */
var LibWasmTask = function()
{
}
/******************************** 
*
*********************************/
LibWasmTask.prototype.convert_html = function(item)
{
//    console.log("#convert_html");
    var ret = "<div class='div_post_row_wrap'>";
    ret += "  <p class='p_title mb-0'>";
    ret += item.title;
    ret += " , <span>ID :" + item.id + "</span>";
    ret += "  </p>";
    ret += "  <hr class='hr_ex1 mt-1 mb-1'>";
    ret += "</div>";
    return ret;    
}

module.exports = LibWasmTask