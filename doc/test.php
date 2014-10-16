<?php
$viewportContent='';

if(stristr($_SERVER['HTTP_USER_AGENT'],'iPhone') || stristr($_SERVER['HTTP_USER_AGENT'],'iPad')){
	$viewportContent = 'width=640,user-scalable=0';
}else{
	if($_COOKIE['viewportScale']){
		$viewportScale = $_COOKIE['viewportScale'];

		$viewportContent = 'width=device-width, initial-scale='.$viewportScale.',minimum-scale='.$viewportScale.',maximum-scale='.$viewportScale;
	}else{
		header('location:setViewport.html?time='.time().'&src='.urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']));
	}
}

?>


<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>页面适配</title>

    <meta content="<?php echo $viewportContent?>" name="viewport"/>
    <style type="text/css">
        html, body {
            padding: 0;
            margin: 0;
        }

        .mod-header {
            position: relative;
            height: 88px;
            line-height: 88px;
            text-indent: -9999px;
            background-color: #c30023;
            box-shadow: 1px 1px 1px #fff;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 200px;
            margin-top: 0;
        }

        .mod-header.index {
            background-image: url(http://m.hot.vdian.com/images/indexH.png);
        }

    </style>

</head>
<body class="loading">

<div style="width: 640px;margin: auto;position: relative;background:#fff">
    <h1 class="mod-header index">微店</h1>
    <div style="position: relative;margin-left: 19px;">
        <a href="test1.php"><img src="http://img.geilicdn.com/SBBwVN2sFYguHYP0ZRqNUcalz9kdrnXsfQh_290x272.jpg"/></a>
        <img src="http://img.geilicdn.com/SBBCkHFO2Y0M70T7AnHXARDY.O2f7Sr4VklB-VmLqoerdQ=_290x307.jpg" style="margin-left: 17px;"/>
        <img src="http://img.geilicdn.com/SBBqFCJ7ZmCrO5GeguEPDlryPyGEE42cSzqSlJ8ZDknGKb=_290x441.jpg"/>
        <img src="http://img.geilicdn.com/SBBqFCJ7ZmCrOJSnZmrdw9B7OLaMZQY3IPSL6C7Ieo4wQ8=_290x452.jpg"
             style="margin-left: 17px;"/>
        <img src="http://img.geilicdn.com/SBBqFCJ7ZmCrOQPkHpC.2mQo3DbsepFW-68s5iRS0H7wVw=_290x360.jpg"/>
        <img src="http://img.geilicdn.com/SBBNCCYl-.hyxPRJo2FYbHiA4pVYeib-U1L_290x291.jpg" style="margin-left: 17px;"/>
        <img src="http://img.geilicdn.com/SBBqFCJ7ZmCrO5GeguEPDlryPyGEE42cSzqSlJ8ZDknGKb=_290x441.jpg"/>
        <img src="http://img.geilicdn.com/SBBqFCJ7ZmCrOJSnZmrdw9B7OLaMZQY3IPSL6C7Ieo4wQ8=_290x452.jpg"
             style="margin-left: 17px;"/>
    </div>



</div>



</body>
</html>