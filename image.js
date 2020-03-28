var showImage = true;
var img;
var lastImgWidth, lastImgHeight;
var imgWidth, imgHeight;
var translateX = 0, translateY = 0;

//------------------------------------------------------------------------------
function getImageSize()
{
	lastImgWidth = imgWidth;
	lastImgHeight = imgHeight;
	var aspect = img.width/img.height;

	imgHeight = height;
	imgWidth = imgHeight * aspect;

  translateX = width/2 - (imgWidth/2);
  translateY = 0;

  if(imgWidth > width)
  {
    imgWidth = width;
  	imgHeight = imgWidth / aspect;

    translateY = height/2 - (imgHeight/2);
    translateX = 0;
  }
	adjustNodePositions(lastImgWidth, lastImgHeight);
}

function adjustNodePositions(_lastImgWidth, _lastImgHeight)
{
	for(var i = 0; i < nodes.length; i++)
	{
		/*nodes[i].x = (nodes[i].x/_lastImgWidth)*imgWidth;
		nodes[i].y = (nodes[i].y/_lastImgHeight)*imgHeight;*/
		nodes[i].x = nodes[i].x*((1/_lastImgWidth)*imgWidth);
		nodes[i].y = nodes[i].y*((1/_lastImgHeight)*imgHeight);
	}
}
