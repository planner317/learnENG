<?php
// данная программа копирует с папки ниже файлы с именим первого слова файла list.txt
$dir='F:/Soft/TranslateIt!/Sounds/Eng/';		// откуда
$fileList = fopen("list.txt","r");				// список файлов англ. слово рус. словоа...

$list=fread($fileList, 99999);
preg_match_all("/^(?<eng>[a-z'-]+)\s+(?<ru>.+)/imu",$list,$r);


$wavs = scandir($dir);							// все название файлов с папки dir
// стераю расширение. перевожу в нижний регистр
foreach ($wavs as $key1 => $value1) {
	$noWavLow[]= strtolower( preg_replace("/\.[^.]+$/","",$value1) );
}

$countCopy = [ "well"=>0, "wrong"=>0];
echo "копирование от сюда $dir сюда ./eng/<br>";
foreach ($r['eng'] as $key => $value) {
	$engLow[$key]=strtolower($value);
	if ( $index = array_search($engLow[$key], $noWavLow )  ){	// поиск элементов в массиве $noWavLow
		$countCopy["well"]++;
		$f = $wavs[$index];
		if (copy("$dir$f","./eng/$engLow[$key].wav")==0){
			echo "<h4 style='color:red'> не удалось скопировать: $f</h4>";
		}
	}
	else {
		$countCopy["wrong"]++;
		echo "<p style='color:red'> файл озвучка не найдена: $value</p>";
	}
};

$duble = array_count_values($engLow);		// поиск дубликатов в массиве
foreach ($duble as $key => $value) {
	if ($value>1) echo "<p style='color:blue'> $key встречается $value раза</p>";
	$coper += $value-1;
}
$sum = $countCopy["well"]+$countCopy["wrong"];
$sum2 = $countCopy["well"]-$coper;
echo "<h3> проверил $sum записей</h3>";
echo "<h3> отсутствует {$countCopy['wrong']} файлов с озвучкой</h3>";
echo "<h3 style='color:blue'> $coper копии </h3>";
echo "<h3> всего файлов скопировано $sum2</h3>";
