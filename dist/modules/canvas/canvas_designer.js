var designer = new CanvasDesigner();

// you can place widget.html anywhere
designer.widgetHTML = 'http://localhost/recording/dist/modules/canvas/widget.html';
designer.widgetJsURL = 'http://localhost/recording/dist/modules/canvas/widget.min.js'

designer.addSyncListener(function(data) {
    connection.send(data);
});

designer.setSelected('pencil');

designer.setTools({
    pencil: true,
    text: true,
    image: true,
    eraser: true,
    line: true,
    arrow: true,
    dragSingle: true,
    dragMultiple: true,
    arc: true,
    rectangle: true,
    quadratic: true,
    bezier: true,
    marker: true
});

designer.appendTo(document.getElementById('widget-container'));

Array.prototype.slice.call(document.getElementById('action-controls').querySelectorAll('input[type=checkbox]')).forEach(function(checkbox) {
    checkbox.onchange = function() {
        designer.destroy();
        
        designer.addSyncListener(function(data) {
            connection.send(data);
        });
        
        var tools = {};
        Array.prototype.slice.call(document.getElementById('action-controls').querySelectorAll('input[type=checkbox]')).forEach(function(checkbox2) {
            if(checkbox2.checked) {
                tools[checkbox2.id] = true;
            }
        });
        designer.setTools(tools);
        designer.appendTo(document.getElementById('widget-container'));
    };
});

var undoOptions = document.getElementById('undo-options');

document.getElementById('btn-display-undo-popup').onclick = function() {
    document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block';
};

var txtNumberOfShapesToUndo = document.getElementById('number-of-shapes-to-undo');
txtNumberOfShapesToUndo.onkeyup = function() {
    localStorage.setItem('number-of-shapes-to-undo', txtNumberOfShapesToUndo.value);
}

if(localStorage.getItem('number-of-shapes-to-undo')){ 
    txtNumberOfShapesToUndo.value = localStorage.getItem('number-of-shapes-to-undo');
    txtNumberOfShapesToUndo.onkeyup();
}

undoOptions.onchange = function() {
    txtNumberOfShapesToUndo.parentNode.style.display = 'none';

    if(undoOptions.value === 'Specific Range') {
        // 
    }
    else if(undoOptions.value === 'Last Multiple') {
        txtNumberOfShapesToUndo.parentNode.style.display = 'block';
    }

    localStorage.setItem('undo-options', undoOptions.value);
};

undoOptions.onclick = undoOptions.onchange;

if(localStorage.getItem('undo-options')) {
    undoOptions.value = localStorage.getItem('undo-options');
    undoOptions.onchange();
}

document.getElementById('btn-undo').onclick = function() {
    if(undoOptions.value === 'All Shapes') {
        designer.undo('all');
    }
    else if(undoOptions.value === 'Specific Range') {
        designer.undo({
            specificRange: {
                start: -1,
                end: -1
            }
        });
    }
    else if(undoOptions.value === 'Last Shape') {
        designer.undo(-1);
    }
    else if(undoOptions.value === 'Last Multiple') {
        var numberOfLastShapes = txtNumberOfShapesToUndo.value;
        numberOfLastShapes = parseInt(numberOfLastShapes || 0) || 0;
        designer.undo({
            numberOfLastShapes: numberOfLastShapes
        });
    }

    closeUndoPopup();
};

function closeUndoPopup() {
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';

    undoOptions.onchange();
}
document.getElementById('btn-close-undo-popup').onclick = closeUndoPopup;

function closeDataURLPopup() {
    document.getElementById('dataURL-popup').style.display='none';
    document.getElementById('fade').style.display='none';

    dataURLFormat.onchange();
}
document.getElementById('btn-close-dataURL-popup').onclick = closeDataURLPopup;

document.getElementById('export-as-image').onclick = function() {
    document.getElementById('dataURL-popup').style.display='block';
    document.getElementById('fade').style.display='block';
};

var dataURLFormat = document.getElementById('data-url-format');

dataURLFormat.onchange = function() {
    localStorage.setItem('data-url-format', dataURLFormat.value);
};
dataURLFormat.onclick = dataURLFormat.onchange;

if(localStorage.getItem('data-url-format')) {
    dataURLFormat.value = localStorage.getItem('data-url-format');
    dataURLFormat.onchange();
}

document.getElementById('btn-getDataURL').onclick = function() {
    var format = dataURLFormat.value;

    designer.toDataURL(format || 'image/png', function(dataURL) {
       window.open(dataURL)
    });

    closeDataURLPopup();
};