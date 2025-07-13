const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document)
document.addEventListener('DOMContentLoaded', function () {

    const codeInput = $('#code-input');
    const previewFrame = $('#preview-frame');
    const contextMenu = $('#context-menu');
    const deleteBtn = contextMenu.querySelector('.delete');
    const copyBtn = contextMenu.querySelector('.copy');
    const paste = contextMenu.querySelector('.paste');
    let clipboardValue = '';
    window.addEventListener('beforeunload', handleBeforeUnload);
    codeInput.addEventListener('input', updatePreview)
    document.addEventListener('contextmenu', showContextMenu);
    document.addEventListener('mousedown', hideContextMenuIfClickOutSide);
    contextMenu.addEventListener('click', handleContextMenuClick);
    function handleBeforeUnload(e) {
        if (!codeInput.value.trim()) return;
        e.returnValue = 'Are you sure you want to leave?';
    }
    function updatePreview() {
        previewFrame.srcdoc = codeInput.value.trim();
    }
    function showContextMenu(e) {
        if (e.target.closest('.preview')) return;
        e.preventDefault();
        contextMenu.hidden = false;
        const { clientX: x, clientY: y } = e;
        const hasSelection = codeInput.selectionStart !== codeInput.selectionEnd;
        Object.assign(contextMenu.style, calculateMenuPosition(x, y));
        if (!hasSelection && document.activeElement === codeInput) {
            codeInput.blur();
        }
    }
    function hideContextMenuIfClickOutSide(e) {
        if (!contextMenu.contains(e.target)) {
            contextMenu.hidden = true;
        }
    }
    function handleContextMenuClick(e) {
        const clicked=e.target.closest('li');
        if(clicked===deleteBtn){
            handleDelete();
        }
        else if(clicked===copyBtn){
            handleCopy();
        }
        else{
            handlePaste();
        }
        contextMenu.hidden=true;
        
    }
    function handleDelete(){
        codeInput.value='';
        previewFrame.srcdoc='';
    }
    function handleCopy(){
        const selected=codeInput.value.substring(codeInput.selectionStart, codeInput.selectionEnd);
        clipboardValue= selected || codeInput.value;
    }
    function handlePaste(){
        codeInput.value+=clipboardValue;
        previewFrame.srcdoc=codeInput.value;
    }
    function calculateMenuPosition(mouseX, mouseY) {
        const menuWidth = contextMenu.offsetWidth;
        const menuHeight = contextMenu.offsetHeight;
        const isOverFlowBottom = mouseY + menuHeight > window.innerHeight;
        const isOverFlowRight = mouseX + menuWidth > window.innerWidth;
        return {
            top: isOverFlowBottom ? `${mouseY - menuHeight}px` : `${mouseY}px`,
            left: isOverFlowRight ? `${mouseX - menuWidth}px` : `${mouseX}px`,
            position: 'absolute'
        };
    }
})