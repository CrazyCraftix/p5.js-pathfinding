//-------------------------------------
var nodeColor;
var connectionColor;
var selectedColor;

var pathColor;
var pathNodeColor;

var linkingNode = -1;

var myCanvas;
//-------------------------------------

function preload()
{
	//img = createImage(1920, 1080);
	img = loadImage('karte.jpg');
	loadStrings('pathFindingSave.txt', done);
}

var defaultNodes;
function done(result) {
	defaultNodes = result[0];
}

function setup()
{
	//-------------------------------------
	nodeColor = color(200, 200, 200);
	connectionColor = color(0, 0, 0);
	selectedColor = color(0, 0, 255);
	pathColor = color(0, 255, 0);
	pathNodeColor = color(0, 255, 0);
	//-------------------------------------


	myCanvas = createCanvas(windowWidth, windowHeight);
	getImageSize();

	myCanvas.drop(fileDropped);
	gotTextAsInput(defaultNodes);
}

function windowResized()
{

	resizeCanvas(windowWidth, windowHeight);
	getImageSize();
	onZoom(0); // recalculate translateX, translateY
}

function draw()
{
	if(gotImageCount >= 0)
	{
		if(gotImageCount == 1)
		{
			getImageSize();
			gotImageCount = -2;
		}
		gotImageCount++;
	}
	background(100);

	translate( translateX + draggedX,
	 					 translateY + draggedY);

	scale(zoom);
	if(showImage) image(img, 0, 0, imgWidth, imgHeight);
	//console.log(linkingNode);
	if(linkingNode != -1)
	{
		//console.log(linkingNode);
		strokeWeight(defaultLineStrokeWeight/(img.width/imgWidth));
		line(nodes[linkingNode].x, nodes[linkingNode].y, globalPosX(), globalPosY());
	}
	nodeNetOut();
}

//------------------------------------------------------------------------------

function mouseWheel(event)
{
	if(keyIsPressed && keyCode == SHIFT) onZoom(event.delta);
	else resizeNodes(event.delta);
}

function mouseDragged()
{
	dragScreen();
	dragNode();
}

function mouseReleased()
{
	if(mouseButton == CENTER)
	{
		stopDrag();
		return;
	}
	if(mouseButton == LEFT) if(draggedNode != -1)
	{
		draggedNode = -1;
		return;
	}

	/*var onThisConnection = checkForConnection(globalPosX(), globalPosY());
	console.log(onThisConnection);
	if(onThisConnection != -1)
	{
		if(mouseButton == LEFT)
		{
			if(keyCode == SHIFT && keyIsPressed)
			{
				selected[1].push(onThisConnection);
			}
			else
			{
				selected[0].length = 0;
				selected[1].length = 1;
				selected[1][0] = onThisConnection;
			}
		}
	}*/

	var onThisNode = checkForNode(globalPosX(), globalPosY());
	if(onThisNode != -1) // on node
	{
		if(mouseButton == RIGHT)
		{
			if(linkingNode == -1)
				linkingNode = onThisNode;
			else
			{
				linkNodes(linkingNode, onThisNode);
				linkingNode = onThisNode;
			}
		}
		if(mouseButton == LEFT)
		{
			if(linkingNode != -1)
			{
				linkNodes(linkingNode, onThisNode);
				linkingNode = -1;
				return;
			}
			if(keyCode == SHIFT && keyIsPressed)
				selected[0].push(onThisNode);
			else
			{
				selected[0].length = 1;
				selected[1].length = 0;
				selected[0][0] = onThisNode;
				lastNodeDiameter = nodes[onThisNode].diameter;
			}
		}
		return;
	}
	if(mouseButton == RIGHT)
	{
		addNode(globalPosX(), globalPosY());
		if(linkingNode != -1)
		{
			linkNodes(linkingNode, nodes.length-1);
			linkingNode = nodes.length-1;
		}
	}
	if(mouseButton == LEFT)
	{
		if(linkingNode != -1) linkingNode = -1;
		else selected[0].length = 0;
	}
}

function keyPressed()
{
	var onThisNode = checkForNode(globalPosX(), globalPosY());
	if(key == 'Q' && onThisNode != -1)
	{
		var alreadySelected = false;
		for(var i = 0; i < selectedPathNodes.length; i++)
			if(selectedPathNodes[i] == onThisNode)
			{
				selectedPathNodes.splice(i, 1);
				alreadySelected = true;
				break;
			}
		if(!alreadySelected) selectedPathNodes.push(onThisNode);
	}

	if(key == 'W')
		selectedPathNodes.length = 0;


	if(keyCode == DELETE)
	{
		if(linkingNode != -1) linkingNode = -1;
		if(draggedNode != -1) draggedNode = -1;
		for(var i = 0; i < selected[0].length; i++)
		{
			removeNode(selected[0][i]);
		}
		selected[0].length = 0;
		selectedPathNodes.length = 0;
	}
	if(keyCode == ESCAPE)
		showImage = !showImage;
	if(key == 'S')
		saveScene();
	if(key == 'A')
	{
		selected[0].length = 0;
		for(var i = 0; i < nodes.length; i++)
		{
			selected[0].push(i);
		}
	}
}
