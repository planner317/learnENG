<?php
$fileList = fopen("list.txt","r");	
$list = fread($fileList, 99999);
preg_match_all("/^(?<eng>[a-z'-]+)\s(?<ru>.+)/imu",$list, $r);
$index=range(0, count($r['eng'])-1     );
shuffle($index);
for ($i = 0; $i < 10; $i++) {
	$w20["eng"][$i] = strtolower( $r["eng"][$index[$i]]);
	$w20["ru"][$i] = $r["ru"][$index[$i]];
}
//print_r($w20);
$json = json_encode($w20,JSON_UNESCAPED_UNICODE);
echo $json;
