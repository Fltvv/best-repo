<div id="map" style="width:100%; height: 100vh;"></div>

<script type="text/javascript">
        // Как только будет загружен API и готов DOM, выполняем инициализацию
        ymaps.ready(init);
 
        function init () {
            // Создание экземпляра карты и его привязка к контейнеру с
            // заданным id ("map")
            var myMap = new ymaps.Map('map', {
                    // При инициализации карты, обязательно нужно указать
                    // ее центр и коэффициент масштабирования
                    center: [74.4058289585647,57.60317449951157],
                    zoom: <?if(MOBILE==true):?>3<?else:?>4<?endif;?>,
                    type: 'yandex#hybrid'
                });
 
			<?foreach($coords as $key=>$val):?>
                 var geometry<?=$key;?> = [<?=$val;?>],
 
			     properties<?=$key;?> = {
				   hintContent: "Маршрут <?=$key;?>"
			     },
			     options<?=$key;?> = {
				  draggable: false,
				  strokeColor: '#2b6ed1',
				  strokeWidth: 5,
                  strokeStyle: 'dash'
                 },
			     
                 polyline<?=$key;?> = new ymaps.Polyline(geometry<?=$key;?>, properties<?=$key;?>, options<?=$key;?>);
 
			     myMap.geoObjects.add(polyline<?=$key;?>);	
                 
                 var placemark<?=$key;?> = new ymaps.Placemark([<?=$routes[$key][0];?>], {
                    balloonContentBody: [
                    '<div>',
                    '<strong><?=$ships[ $routeShip[$key] ]['name'];?></strong>',
                    '<br/>',
                    'Класс: <?=$ships[ $routeShip[$key] ]['ice_class'];?>',
                    '<br/>',
                    'ИМО: <?=$ships[ $routeShip[$key] ]['imo'];?>',
                    '<br/>',
                    'Средняя скорость: <?=round($speed[$key]/count($speedCount[$key]),2);?> узлов/час',
                    '<br/>',
                    'Время прохождения: <?=secondsToTime($allTimes[$key]*3600);?>',
                    '</div>'
                    ].join('')
                 }, {
                   pixelPerfect: false,
                   iconLayout: 'default#image',
                   iconImageHref: '/img/<?=$ships[ $routeShip[$key] ]['img'];?>',
                   iconImageSize: [50, 50],
                   iconImageOffset: [-30, -30]
                 },
                 );

                 myMap.geoObjects.add(placemark<?=$key;?>);	
                 
                 var coordinates<?=$key;?> = [<?=$val;?>];
                 var currentIndex<?=$key;?> = 0;
                 var times<?=$key;?> = [0,<?=$times[$key];?>];
                 
                 function animateMarker<?=$key;?>() {
                   placemark<?=$key;?>.geometry.setCoordinates(coordinates<?=$key;?>[currentIndex<?=$key;?>]);
                   if (currentIndex<?=$key;?> < coordinates<?=$key;?>.length - 1) {
                     currentIndex<?=$key;?>++;
                     
                     setTimeout(animateMarker<?=$key;?>, times<?=$key;?>[currentIndex<?=$key;?>]);
                   }
                 }

            animateMarker<?=$key;?>();
              
            <?endforeach;?>
        }
</script>