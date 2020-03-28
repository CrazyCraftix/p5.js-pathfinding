var zoom = 1;
var lastZoom = zoom;
var zoomMouseX = 0, zoomMouseY = 0;

var draggedX = 0, draggedY = 0;
var draggedPosX = '', draggedPosY = '';

//------------------------------------------------------------------------------

function onZoom(_scrollAmount)
{
  lastZoom = zoom;
  if(_scrollAmount < 0)
  {
    zoom = zoom*1.1;
    zoom = Math.ceil(zoom*10)/10;
  }
  else if(_scrollAmount > 0)
  {
    zoom = zoom/1.1;
    zoom = Math.floor(zoom*10)/10;
  }
  if(zoom < 0.1)
    zoom = 0.1;
    if(zoom > 100)
      zoom = 100;

  if(zoom > 1)
  {
    translateX = mouseX - ((mouseX - translateX)/lastZoom)*zoom;
    translateY = mouseY - ((mouseY - translateY)/lastZoom)*zoom;
  }
  else
  {
    translateX = (width/2) - imgWidth*zoom/2;
    translateY = (height/2) - imgHeight*zoom/2;
  }
}

function dragScreen()
{
  if(mouseButton != CENTER) return;
  if(draggedPosX == '')
    draggedPosX = mouseX/zoom;
  if(draggedPosY == '')
    draggedPosY = mouseY/zoom;

  draggedX = mouseX - draggedPosX*zoom;
  draggedY = mouseY - draggedPosY*zoom;
}

function stopDrag()
{
  if(draggedPosX == '') return; // don't run if Screen wasn't dragged
  translateX += draggedX;
  translateY += draggedY;

  draggedX = 0;
  draggedY = 0;

  draggedPosX = '';
  draggedPosY = '';
}

function globalPosX()
{
  return (mouseX-(translateX+draggedX))/zoom;
}

function globalPosY()
{
  return (mouseY-(translateY+draggedY))/zoom;
}
