
$(document).ready(function () {

    //შეჯიბრის წინ ჩაწერე აქ რამდენ ბილიკიანი უზიაა!
    let lanesQuantityInPool = 8;


    let PreResults = $('#keepPreResultsHere').html();
    let splittedPreResults = PreResults.split('///')
    let secondSplit;
    let mainArray = [];
    let alreadyBuilt = 0;
    let alreadyCreated = 0;
    let countEvents = 0;
    let countEventsStartlist = 0;
    for (i = 0; i < splittedPreResults.length; i++) {
        secondSplit = splittedPreResults[i].split('//')
        mainArray.push(secondSplit)
    }

    //პროგრამა აწყობილია 01.01:01 ზე. ამიტომ 01:01.01ს აკონვერტირებ 
    for (i = 0; i < mainArray.length; i++) {
        if (mainArray[i][5]) {
            mainArray[i][5] = mainArray[i][5].split(':')[0] + '.' + mainArray[i][5].split(':')[1].split('.')[0] + ':' + mainArray[i][5].split(':')[1].split('.')[1];
        }
    }

    // ივენთის არეებში სპორცმენების გადანაწილება
    for (i = 0; i < mainArray.length; i++) {
        for (j = 0; j < eventsArray.length; j++) {
            if (mainArray[i][4] == eventsArray[j].gender && mainArray[i][3] == eventsArray[j].event) {
                eventsArray[j].swimmer.push(mainArray[i])
            }
        }
    }
    // აქ უკვე გადანაწილებულია ივენთის არეებში სპორცმენები მაგრამ შესაძლებელია ზოგიერთი ორჯერ იყოს დარეგისტრირებული ერთ დისტანციაზე;

    for (j = 0; j < eventsArray.length; j++) {
        eventsArray[j].swimmer = eventsArray[j].swimmer.reduce((acc, current) => {
            const x = acc.find(item => item[0] === current[0]);
            if (!x) {
                return acc.concat([current])
            } else {
                return acc;
            }
        }, [])
    }
    // აქ უკვე გაცხრილულია სახელები, თუმცა ყურადღებით იყავი ცარიელ ადგილებთან. ერთნაირად არ აღიქვამს ამას ' ვაშაკძე' და 'ვაშაკიძე';

    //როდესაც გინდა რომ 
    let competitionListing = {
        'dayFirst': ['400 თავისუფალი', '200 ბატერფლაი', '100 გულაღმა', '200 ბრასი', '100 თავისუფალი' , '400 კომპლექსი'],
        'daySecond': ['1500 თავისუფალი', '100 ბატერფლაი', '200 გულაღმა', '100 ბრასი', '200 თავისუფალი' , '200 კომპლექსი']
    }

    //სტარტლისტზე დაჭერისას სტარტლისტის გამოტანა
    $('#startListButton').on('click', function () {
        $('#showHeatsButton').hide();
        $('#compName').show();
        $('#startList').show();
        $('#programDiv').hide();
        $('#heats').hide();
        $('#printHeats').hide();
        
        let heatNameAndSwimmers = {
            'name': ' ',
            'swimmers': [],
        }

        let convertedSeconds;
        let satauri;

        if (alreadyBuilt == 0) {
            //ეს მარტო პირველი დღეა
            for (i = 0; i < competitionListing.dayFirst.length; i++) {
                countEventsStartlist++;
                for (j = 0; j < eventsArray.length; j++) {
                    if (competitionListing.dayFirst[i] == eventsArray[j].event) {

                        heatNameAndSwimmers = {
                            'name': ' ',
                            'swimmers': [],
                        }
                        for (p = 0; p < eventsArray[j].swimmer.length; p++) {
                            //აქ აკონვერტირებ დროებს წამებში
                            convertedSeconds = parseInt((eventsArray[j].swimmer[p][5].split('.')[0]) * 60) + parseInt(eventsArray[j].swimmer[p][5].split('.')[1].split(':')[0]) + ((eventsArray[j].swimmer[p][5].split('.')[1].split(':')[1]) / 100);
                            //აქ იქმნება არრეები სადაც დალაგებულია გაცურვების
                            heatNameAndSwimmers.name = competitionListing.dayFirst[i];
                            heatNameAndSwimmers.swimmers.push({ 'name': eventsArray[j].swimmer[p][0], 'age': eventsArray[j].swimmer[p][1], 'club': eventsArray[j].swimmer[p][2], 'event': eventsArray[j].swimmer[p][3], 'gender': eventsArray[j].swimmer[p][4], 'time': eventsArray[j].swimmer[p][5], 'location': eventsArray[j].swimmer[p][6], 'date': eventsArray[j].swimmer[p][7], 'seconds': convertedSeconds })
                        }

                        if (heatNameAndSwimmers.name != ' ') {
                            // აქ უნდა დაალგო არეები ისე რომ სტარტლისტში მონაწილეები სწორად დალაგდნენ ყველზე ჩქარიდან ყველაზე ნელისკენ
                            heatNameAndSwimmers.swimmers.sort((a, b) => {
                                return a.seconds - b.seconds;
                            });
                            //აქ იწერება დივებში რეების მონცემებ


                            heatNameAndSwimmers.swimmers[0].gender == 'კაცი' ? satauri = 'კაცები' : satauri = 'ქალები'
                            heatNameAndSwimmers.swimmers[0].gender == 'კაცი' ? satauri = 'კაცები' : satauri = 'ქალები'
                            $('#firstDay').append('<div class="eventsHeader2">' + 'ივენთი ' + countEventsStartlist + '</div></br>')
                            $('#firstDay').append('<div class="eventsHeader2">' + heatNameAndSwimmers.name + ' ' + satauri + '</div></br>')
                            $('#firstDay').append('<div class="swimmersDataHeader"><nav></nav><nav>სახელი</nav><nav>კლუბი</nav><nav>დაბ.წელი</nav><nav>წინასწარი შედეგი</nav><nav>შეჯიბრი</nav><nav>თარიღი</nav></div><hr>')
                            for (t = 0; t < heatNameAndSwimmers.swimmers.length; t++) {
                                //აქ ისევ აკონვერტირებ 01.01:01 ს სწორად რომ გამოჩნდეს.
                                heatNameAndSwimmers.swimmers[t].time = heatNameAndSwimmers.swimmers[t].time.split('.')[0] + ':' + heatNameAndSwimmers.swimmers[t].time.split('.')[1].split(':')[0] + '.' + heatNameAndSwimmers.swimmers[t].time.split('.')[1].split(':')[1];
                                $('#firstDay').append('<div class="swimmersData"><nav>' + (t + 1) + ') </nav><nav>' + heatNameAndSwimmers.swimmers[t].name + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].club + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].age + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].time + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].location + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].date + '</nav></div>')
                            }
                            $('#firstDay').append('</br></br></br></br></br>')
                        }

                    }
                }
            }
            //ეს მარტო meore დღეა
            for (i = 0; i < competitionListing.daySecond.length; i++) {
                countEventsStartlist++;
                for (j = 0; j < eventsArray.length; j++) {
                    if (competitionListing.daySecond[i] == eventsArray[j].event) {
                        heatNameAndSwimmers = {
                            'name': ' ',
                            'swimmers': [],
                        }
                        for (p = 0; p < eventsArray[j].swimmer.length; p++) {
                            //აქ აკონვერტირებ დროებს წამებში
                            convertedSeconds = parseInt((eventsArray[j].swimmer[p][5].split('.')[0]) * 60) + parseInt(eventsArray[j].swimmer[p][5].split('.')[1].split(':')[0]) + ((eventsArray[j].swimmer[p][5].split('.')[1].split(':')[1]) / 100);
                            //აქ იქმნება არრეები სადაც დალაგებულია გაცურვების
                            heatNameAndSwimmers.name = competitionListing.daySecond[i];
                            heatNameAndSwimmers.swimmers.push({ 'name': eventsArray[j].swimmer[p][0], 'age': eventsArray[j].swimmer[p][1], 'club': eventsArray[j].swimmer[p][2], 'event': eventsArray[j].swimmer[p][3], 'gender': eventsArray[j].swimmer[p][4], 'time': eventsArray[j].swimmer[p][5], 'location': eventsArray[j].swimmer[p][6], 'date': eventsArray[j].swimmer[p][7], 'seconds': convertedSeconds })
                        }

                        if (heatNameAndSwimmers.name != ' ') {
                            // აქ უნდა დაალგო არეები ისე რომ სტარტლისტში მონაწილეები სწორად დალაგდნენ ყველზე ჩქარიდან ყველაზე ნელისკენ
                            heatNameAndSwimmers.swimmers.sort((a, b) => {
                                return a.seconds - b.seconds;
                            });
                            //აქ იწერება დივებში რეების მონცემები

                            heatNameAndSwimmers.swimmers[0].gender == 'კაცი' ? satauri = 'კაცები' : satauri = 'ქალები';
                            $('#secondDay').append('<div class="eventsHeader2">' + 'ივენთი ' + countEventsStartlist + '</div></br>')
                            $('#secondDay').append('<div class="eventsHeader2">' + heatNameAndSwimmers.name + ' ' + satauri + '</div></br>')
                            $('#secondDay').append('<div class="swimmersDataHeader"><nav></nav><nav>სახელი</nav><nav>კლუბი</nav><nav>დაბ.წელი</nav><nav>წინასწარი შედეგი</nav><nav>შეჯიბრი</nav><nav>თარიღი</nav></div><hr>')
                            for (t = 0; t < heatNameAndSwimmers.swimmers.length; t++) {
                                heatNameAndSwimmers.swimmers[t].time = heatNameAndSwimmers.swimmers[t].time.split('.')[0] + ':' + heatNameAndSwimmers.swimmers[t].time.split('.')[1].split(':')[0] + '.' + heatNameAndSwimmers.swimmers[t].time.split('.')[1].split(':')[1];
                                $('#secondDay').append('<div class="swimmersData"><nav>' + (t + 1) + ') </nav><nav>' + heatNameAndSwimmers.swimmers[t].name + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].club + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].age + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].time + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].location + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].date + '</nav></div>')
                            }
                            $('#secondDay').append('</br></br></br></br></br>')
                        }

                    }
                }
            }
            alreadyBuilt = 1;
        }
    })






    //გაცურვებზე დაჭერისას გაცურვების გამოტანა
    $('#showHeats').on('click', function () {
        $('#thirds').show()
        $('#firsts').show();
        $('#seconds').show()
        $('#programDiv').hide();
        $('#compName').show();
        $('#showHeatsButton').show();
        $('#startList').hide();
        $('#heats').show();
        $('#printHeats').show();
        if (alreadyCreated == 0) {
            let heatNameAndSwimmers2 = {
                'name': ' ',
                'swimmers': [],
            }

            let convertedSeconds2;
            let satauri2, satauri1;
            let convertedArray = [];
            let count = 0;
            //ეს მარტო პირველი დღეა
            for (i = 0; i < competitionListing.dayFirst.length; i++) {
                countEvents++;
                for (j = 0; j < eventsArray.length; j++) {
                    if (competitionListing.dayFirst[i] == eventsArray[j].event) {
                        heatNameAndSwimmers2 = {
                            'name': ' ',
                            'swimmers': [],
                        }
                        for (p = 0; p < eventsArray[j].swimmer.length; p++) {
                            //აქ აკონვერტირებ დროებს წამებში
                            convertedSeconds2 = parseInt((eventsArray[j].swimmer[p][5].split('.')[0]) * 60) + parseInt(eventsArray[j].swimmer[p][5].split('.')[1].split(':')[0]) + ((eventsArray[j].swimmer[p][5].split('.')[1].split(':')[1]) / 100);
                            //აქ იქმნება არრეები სადაც დალაგებულია გაცურვების
                            heatNameAndSwimmers2.name = competitionListing.dayFirst[i];
                            heatNameAndSwimmers2.swimmers.push({ 'name': eventsArray[j].swimmer[p][0], 'age': eventsArray[j].swimmer[p][1], 'club': eventsArray[j].swimmer[p][2], 'event': eventsArray[j].swimmer[p][3], 'gender': eventsArray[j].swimmer[p][4], 'time': eventsArray[j].swimmer[p][5], 'location': eventsArray[j].swimmer[p][6], 'date': eventsArray[j].swimmer[p][7], 'seconds': convertedSeconds2 })
                        }

                        if (heatNameAndSwimmers2.name != ' ') {
                            // აქ უნდა დაალგო არეები ისე რომ სტარტლისტში მონაწილეები სწორად დალაგდნენ ყველზე სწრაფიდან ყველაზე ნელისკენ
                            heatNameAndSwimmers2.swimmers.sort((a, b) => {
                                return a.seconds - b.seconds;
                            });
                            //აქ იწერება დივებში რეების მონცემებ

                            count = 0;
                            let reverseCount
                            // აქ დასალგებელია რომ ცარიელი გაცურვა არ გმოვიდეს!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!;
                            //უკვე დაალაგე
                            if (heatNameAndSwimmers2.swimmers.length % lanesQuantityInPool == 0) {
                                reverseCount = parseInt(heatNameAndSwimmers2.swimmers.length / lanesQuantityInPool);
                                nashtii = 0;
                            }
                            if (heatNameAndSwimmers2.swimmers.length % lanesQuantityInPool > 0) {
                                reverseCount = parseInt(heatNameAndSwimmers2.swimmers.length / lanesQuantityInPool) + 1;
                                nashtii = 1;
                            }
                            let pull = reverseCount;
                            //აქ ითვლი რმდენი გაცურვა შედგება
                            for (g = 0; g < (parseInt(heatNameAndSwimmers2.swimmers.length / lanesQuantityInPool)) + nashtii; g++) {
                                convertedArray.push({ 'heat': 'გაცურვა' + ' ' + reverseCount + ' - ' + pull, 'swimmers': [] })
                                // არ ითვლი რამდენი მოცურვე უნდა იყოს ერთ გაცურვაში;
                                for (r = 0; r < lanesQuantityInPool; r++) {
                                    if (heatNameAndSwimmers2.swimmers[count]) {
                                        convertedArray[g].swimmers.push({ 'swimmerName': heatNameAndSwimmers2.swimmers[count].name, 'event': heatNameAndSwimmers2.swimmers[count].event, 'preResult': heatNameAndSwimmers2.swimmers[count].time, 'seconds': heatNameAndSwimmers2.swimmers[count].seconds, 'gender': heatNameAndSwimmers2.swimmers[count].gender, 'date': heatNameAndSwimmers2.swimmers[count].date, 'location': heatNameAndSwimmers2.swimmers[count].location, 'age': heatNameAndSwimmers2.swimmers[count].age, 'club': heatNameAndSwimmers2.swimmers[count].club, 'que': '' })
                                    }

                                    count++;
                                }
                                reverseCount--;
                            }

                            heatNameAndSwimmers2.swimmers[0].gender == 'კაცი' ? satauri2 = 'კაცები' : satauri2 = 'ქალები'
                            heatNameAndSwimmers2.swimmers[0].gender == 'კაცი' ? satauri2 = 'კაცები' : satauri2 = 'ქალები'

                            //აკონვერტირებ 100 თავისუფალი - 100მ თავისუფალი ყაიდა
                            if (heatNameAndSwimmers2.name.split(' ')[1] == 'თავისუფალი') {
                                satauri1 = heatNameAndSwimmers2.name.split(' ')[0] + 'მ ' + 'თავისუფალი ყაიდა'
                            }
                            if (heatNameAndSwimmers2.name.split(' ')[1] == 'გულაღმა') {
                                satauri1 = heatNameAndSwimmers2.name.split(' ')[0] + 'მ ' + 'გულაღმა ცურვა'
                            }
                            if (heatNameAndSwimmers2.name.split(' ')[1] == 'ბრასი') {
                                satauri1 = heatNameAndSwimmers2.name.split(' ')[0] + 'მ ' + 'ბრასი'
                            }
                            if (heatNameAndSwimmers2.name.split(' ')[1] == 'ბატერფლაი') {
                                satauri1 = heatNameAndSwimmers2.name.split(' ')[0] + 'მ ' + 'ბატერფლაი'
                            }
                            if (heatNameAndSwimmers2.name.split(' ')[1] == 'კომპლექსი') {
                                satauri1 = heatNameAndSwimmers2.name.split(' ')[0] + 'მ ' + 'კომპლექსი'
                            }
                            $('#firstDayHeats').append('<div class="eventsHeader21">ივენთი ' + countEvents + '</div></br>')
                            $('#firstDayHeats').append('<div class="eventsHeader2">' + satauri1 + ' ' + satauri2 + '</div></br>')
                            for (o = convertedArray.length - 1; o > -1; o--) {
                                $('#firstDayHeats').append('<div class="heatNumber">' + convertedArray[o].heat + '</div>')
                                $('#firstDayHeats').append('<div class="swimmersData2Header"><nav></nav><nav>სახელი</nav><nav>კლუბი</nav><nav>დაბ.წელი</nav><nav>წინასწარი შედეგი</nav>')


                                // აქ რაღაც უნდ ამოიფიქრო. და უნდა გაითვალისწონი სხვა უფრო დიდი აუზებიც!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                if (lanesQuantityInPool == 4) {
                                    if (convertedArray[o].swimmers[0]) {
                                        convertedArray[o].swimmers[0].que = 2;
                                    }
                                    if (convertedArray[o].swimmers[1]) {
                                        convertedArray[o].swimmers[1].que = 3;
                                    }
                                    if (convertedArray[o].swimmers[2]) {
                                        convertedArray[o].swimmers[2].que = 1;
                                    }
                                    if (convertedArray[o].swimmers[3]) {
                                        convertedArray[o].swimmers[3].que = 4;
                                    }
                                }
                                if (lanesQuantityInPool == 5) {
                                    if (convertedArray[o].swimmers[0]) {
                                        convertedArray[o].swimmers[0].que = 3;
                                    }
                                    if (convertedArray[o].swimmers[1]) {
                                        convertedArray[o].swimmers[1].que = 4;
                                    }
                                    if (convertedArray[o].swimmers[2]) {
                                        convertedArray[o].swimmers[2].que = 2;
                                    }
                                    if (convertedArray[o].swimmers[3]) {
                                        convertedArray[o].swimmers[3].que = 5;
                                    }
                                    if (convertedArray[o].swimmers[4]) {
                                        convertedArray[o].swimmers[4].que = 1;
                                    }
                                }
                                if (lanesQuantityInPool == 6) {
                                    if (convertedArray[o].swimmers[0]) {
                                        convertedArray[o].swimmers[0].que = 3;
                                    }
                                    if (convertedArray[o].swimmers[1]) {
                                        convertedArray[o].swimmers[1].que = 4;
                                    }
                                    if (convertedArray[o].swimmers[2]) {
                                        convertedArray[o].swimmers[2].que = 2;
                                    }
                                    if (convertedArray[o].swimmers[3]) {
                                        convertedArray[o].swimmers[3].que = 5;
                                    }
                                    if (convertedArray[o].swimmers[4]) {
                                        convertedArray[o].swimmers[4].que = 1;
                                    }
                                    if (convertedArray[o].swimmers[5]) {
                                        convertedArray[o].swimmers[5].que = 6;
                                    }
                                }
                                if (lanesQuantityInPool == 7) {
                                    if (convertedArray[o].swimmers[0]) {
                                        convertedArray[o].swimmers[0].que = 4;
                                    }
                                    if (convertedArray[o].swimmers[1]) {
                                        convertedArray[o].swimmers[1].que = 5;
                                    }
                                    if (convertedArray[o].swimmers[2]) {
                                        convertedArray[o].swimmers[2].que = 3;
                                    }
                                    if (convertedArray[o].swimmers[3]) {
                                        convertedArray[o].swimmers[3].que = 6;
                                    }
                                    if (convertedArray[o].swimmers[4]) {
                                        convertedArray[o].swimmers[4].que = 2;
                                    }
                                    if (convertedArray[o].swimmers[5]) {
                                        convertedArray[o].swimmers[5].que = 7;
                                    }
                                    if (convertedArray[o].swimmers[6]) {
                                        convertedArray[o].swimmers[6].que = 1;
                                    }
                                }
                                if (lanesQuantityInPool == 8) {
                                    if (convertedArray[o].swimmers[0]) {
                                        convertedArray[o].swimmers[0].que = 4;
                                    }
                                    if (convertedArray[o].swimmers[1]) {
                                        convertedArray[o].swimmers[1].que = 5;
                                    }
                                    if (convertedArray[o].swimmers[2]) {
                                        convertedArray[o].swimmers[2].que = 3;
                                    }
                                    if (convertedArray[o].swimmers[3]) {
                                        convertedArray[o].swimmers[3].que = 6;
                                    }
                                    if (convertedArray[o].swimmers[4]) {
                                        convertedArray[o].swimmers[4].que = 2;
                                    }
                                    if (convertedArray[o].swimmers[5]) {
                                        convertedArray[o].swimmers[5].que = 7;
                                    }
                                    if (convertedArray[o].swimmers[6]) {
                                        convertedArray[o].swimmers[6].que = 1;
                                    }
                                    if (convertedArray[o].swimmers[7]) {
                                        convertedArray[o].swimmers[7].que = 8;
                                    }
                                }


                                // ალაგებს que ების მიხედვით რომელიც თავდაპირველად ჩაფუშე არეიში. შემდეგ მიანიჭე მას სპეციალური ნომრები LanesQuantityInPoolის დახმარებით და შემდეგ გამოიტანე ეკრანზე. 
                                // ConvertedArray ში დალაგებულია მოცურავეები გცურვებშ და გაცურვებიც!!!!! :))))
                                convertedArray[o].swimmers.sort((a, b) => {
                                    return a.que - b.que;
                                });


                                for (l = 0; l < convertedArray[o].swimmers.length; l++) {
                                    convertedArray[o].swimmers[l].preResult = convertedArray[o].swimmers[l].preResult.split('.')[0] + ':' + convertedArray[o].swimmers[l].preResult.split('.')[1].split(':')[0] + '.' + convertedArray[o].swimmers[l].preResult.split('.')[1].split(':')[1];
                                    $('#firstDayHeats').append('<div class="swimmersData2"><nav></nav><nav>' + 'ბილიკი ' + convertedArray[o].swimmers[l].que + '.</nav><nav>' + convertedArray[o].swimmers[l].swimmerName + '</nav><nav>' + convertedArray[o].swimmers[l].club + '</nav><nav>' + convertedArray[o].swimmers[l].age + '</nav><nav>' + convertedArray[o].swimmers[l].preResult + '</nav>')
                                }

                                $('#firstDayHeats').append('</br></br>')
                            }
                            $('#firstDayHeats').append('</br></br></br></br></br>')
                            convertedArray = [];
                        }

                    }
                }
            }


            // მეორე დღისსსსს
            for (i = 0; i < competitionListing.daySecond.length; i++) {
                countEvents++;
                for (j = 0; j < eventsArray.length; j++) {
                    if (competitionListing.daySecond[i] == eventsArray[j].event) {
                        heatNameAndSwimmers2 = {
                            'name': ' ',
                            'swimmers': [],
                        }
                        for (p = 0; p < eventsArray[j].swimmer.length; p++) {
                            //აქ აკონვერტირებ დროებს წამებში
                            convertedSeconds2 = parseInt((eventsArray[j].swimmer[p][5].split('.')[0]) * 60) + parseInt(eventsArray[j].swimmer[p][5].split('.')[1].split(':')[0]) + ((eventsArray[j].swimmer[p][5].split('.')[1].split(':')[1]) / 100);
                            //აქ იქმნება არრეები სადაც დალაგებულია გაცურვების
                            heatNameAndSwimmers2.name = competitionListing.daySecond[i];
                            heatNameAndSwimmers2.swimmers.push({ 'name': eventsArray[j].swimmer[p][0], 'age': eventsArray[j].swimmer[p][1], 'club': eventsArray[j].swimmer[p][2], 'event': eventsArray[j].swimmer[p][3], 'gender': eventsArray[j].swimmer[p][4], 'time': eventsArray[j].swimmer[p][5], 'location': eventsArray[j].swimmer[p][6], 'date': eventsArray[j].swimmer[p][7], 'seconds': convertedSeconds2 })
                        }

                        if (heatNameAndSwimmers2.name != ' ') {
                            // აქ უნდა დაალგო არეები ისე რომ სტარტლისტში მონაწილეები სწორად დალაგდნენ ყველზე სწრაფიდან ყველაზე ნელისკენ
                            heatNameAndSwimmers2.swimmers.sort((a, b) => {
                                return a.seconds - b.seconds;
                            });
                            //აქ იწერება დივებში რეების მონცემებ

                            count = 0;
                            let reverseCount;
                            let nashtii;
                            // აქ დასალგებელია რომ ცარიელი გაცურვა არ გმოვიდეს!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!;
                            if (heatNameAndSwimmers2.swimmers.length % lanesQuantityInPool == 0) {
                                reverseCount = parseInt(heatNameAndSwimmers2.swimmers.length / lanesQuantityInPool);
                                nashtii = 0;
                            }
                            if (heatNameAndSwimmers2.swimmers.length % lanesQuantityInPool > 0) {
                                reverseCount = parseInt(heatNameAndSwimmers2.swimmers.length / lanesQuantityInPool) + 1;
                                nashtii = 1;
                            }
                             let pull = reverseCount;
                            //აქ ითვლი რმდენი გაცურვა შედგება
                            for (g = 0; g < (parseInt(heatNameAndSwimmers2.swimmers.length / lanesQuantityInPool)) + nashtii; g++) {
                                convertedArray.push({ 'heat': 'გაცურვა' + ' ' + reverseCount + ' - ' + pull, 'swimmers': [] })
                                // არ ითვლი რამდენი მოცურვე უნდა იყოს ერთ გაცურვაში;
                                for (r = 0; r < lanesQuantityInPool; r++) {
                                    if (heatNameAndSwimmers2.swimmers[count]) {
                                        convertedArray[g].swimmers.push({ 'swimmerName': heatNameAndSwimmers2.swimmers[count].name, 'event': heatNameAndSwimmers2.swimmers[count].event, 'preResult': heatNameAndSwimmers2.swimmers[count].time, 'seconds': heatNameAndSwimmers2.swimmers[count].seconds, 'gender': heatNameAndSwimmers2.swimmers[count].gender, 'date': heatNameAndSwimmers2.swimmers[count].date, 'location': heatNameAndSwimmers2.swimmers[count].location, 'age': heatNameAndSwimmers2.swimmers[count].age, 'club': heatNameAndSwimmers2.swimmers[count].club, 'que': '' })
                                    }

                                    count++;
                                }
                                reverseCount--;
                            }


                            heatNameAndSwimmers2.swimmers[0].gender == 'კაცი' ? satauri2 = 'კაცები' : satauri2 = 'ქალები'
                            heatNameAndSwimmers2.swimmers[0].gender == 'კაცი' ? satauri2 = 'კაცები' : satauri2 = 'ქალები'

                            //აკონვერტირებ 100 თავისუფალი - 100მ თავისუფალი ყაიდა
                            if (heatNameAndSwimmers2.name.split(' ')[1] == 'თავისუფალი') {
                                satauri1 = heatNameAndSwimmers2.name.split(' ')[0] + 'მ ' + 'თავისუფალი ყაიდა'
                            }
                            if (heatNameAndSwimmers2.name.split(' ')[1] == 'გულაღმა') {
                                satauri1 = heatNameAndSwimmers2.name.split(' ')[0] + 'მ ' + 'გულაღმა ცურვა'
                            }
                            if (heatNameAndSwimmers2.name.split(' ')[1] == 'ბრასი') {
                                satauri1 = heatNameAndSwimmers2.name.split(' ')[0] + 'მ ' + 'ბრასი'
                            }
                            if (heatNameAndSwimmers2.name.split(' ')[1] == 'ბატერფლაი') {
                                satauri1 = heatNameAndSwimmers2.name.split(' ')[0] + 'მ ' + 'ბატერფლაი'
                            }
                            if (heatNameAndSwimmers2.name.split(' ')[1] == 'კომპლექსი') {
                                satauri1 = heatNameAndSwimmers2.name.split(' ')[0] + 'მ ' + 'კომპლექსი'
                            }
                            $('#secondDayHeats').append('<div class="eventsHeader21">ივენთი ' + countEvents + '</div></br>')
                            $('#secondDayHeats').append('<div class="eventsHeader2">' + satauri1 + ' ' + satauri2 + '</div></br>')
                            for (o = convertedArray.length - 1; o > -1; o--) {
                                $('#secondDayHeats').append('<div class="heatNumber">' + convertedArray[o].heat + '</div>')
                                $('#secondDayHeats').append('<div class="swimmersData2Header"><nav></nav><nav>სახელი</nav><nav>კლუბი</nav><nav>დაბ.წელი</nav><nav>წინასწარი შედეგი</nav>')


                                // აქ რაღაც უნდ ამოიფიქრო. და უნდა გაითვალისწონი სხვა უფრო დიდი აუზებიც!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                if (lanesQuantityInPool == 4) {
                                    if (convertedArray[o].swimmers[0]) {
                                        convertedArray[o].swimmers[0].que = 2;
                                    }
                                    if (convertedArray[o].swimmers[1]) {
                                        convertedArray[o].swimmers[1].que = 3;
                                    }
                                    if (convertedArray[o].swimmers[2]) {
                                        convertedArray[o].swimmers[2].que = 1;
                                    }
                                    if (convertedArray[o].swimmers[3]) {
                                        convertedArray[o].swimmers[3].que = 4;
                                    }
                                }
                                if (lanesQuantityInPool == 5) {
                                    if (convertedArray[o].swimmers[0]) {
                                        convertedArray[o].swimmers[0].que = 3;
                                    }
                                    if (convertedArray[o].swimmers[1]) {
                                        convertedArray[o].swimmers[1].que = 4;
                                    }
                                    if (convertedArray[o].swimmers[2]) {
                                        convertedArray[o].swimmers[2].que = 2;
                                    }
                                    if (convertedArray[o].swimmers[3]) {
                                        convertedArray[o].swimmers[3].que = 5;
                                    }
                                    if (convertedArray[o].swimmers[4]) {
                                        convertedArray[o].swimmers[4].que = 1;
                                    }
                                }
                                if (lanesQuantityInPool == 6) {
                                    if (convertedArray[o].swimmers[0]) {
                                        convertedArray[o].swimmers[0].que = 3;
                                    }
                                    if (convertedArray[o].swimmers[1]) {
                                        convertedArray[o].swimmers[1].que = 4;
                                    }
                                    if (convertedArray[o].swimmers[2]) {
                                        convertedArray[o].swimmers[2].que = 2;
                                    }
                                    if (convertedArray[o].swimmers[3]) {
                                        convertedArray[o].swimmers[3].que = 5;
                                    }
                                    if (convertedArray[o].swimmers[4]) {
                                        convertedArray[o].swimmers[4].que = 1;
                                    }
                                    if (convertedArray[o].swimmers[5]) {
                                        convertedArray[o].swimmers[5].que = 6;
                                    }
                                }
                                if (lanesQuantityInPool == 7) {
                                    if (convertedArray[o].swimmers[0]) {
                                        convertedArray[o].swimmers[0].que = 4;
                                    }
                                    if (convertedArray[o].swimmers[1]) {
                                        convertedArray[o].swimmers[1].que = 5;
                                    }
                                    if (convertedArray[o].swimmers[2]) {
                                        convertedArray[o].swimmers[2].que = 3;
                                    }
                                    if (convertedArray[o].swimmers[3]) {
                                        convertedArray[o].swimmers[3].que = 6;
                                    }
                                    if (convertedArray[o].swimmers[4]) {
                                        convertedArray[o].swimmers[4].que = 2;
                                    }
                                    if (convertedArray[o].swimmers[5]) {
                                        convertedArray[o].swimmers[5].que = 7;
                                    }
                                    if (convertedArray[o].swimmers[6]) {
                                        convertedArray[o].swimmers[6].que = 1;
                                    }
                                }
                                if (lanesQuantityInPool == 8) {
                                    if (convertedArray[o].swimmers[0]) {
                                        convertedArray[o].swimmers[0].que = 4;
                                    }
                                    if (convertedArray[o].swimmers[1]) {
                                        convertedArray[o].swimmers[1].que = 5;
                                    }
                                    if (convertedArray[o].swimmers[2]) {
                                        convertedArray[o].swimmers[2].que = 3;
                                    }
                                    if (convertedArray[o].swimmers[3]) {
                                        convertedArray[o].swimmers[3].que = 6;
                                    }
                                    if (convertedArray[o].swimmers[4]) {
                                        convertedArray[o].swimmers[4].que = 2;
                                    }
                                    if (convertedArray[o].swimmers[5]) {
                                        convertedArray[o].swimmers[5].que = 7;
                                    }
                                    if (convertedArray[o].swimmers[6]) {
                                        convertedArray[o].swimmers[6].que = 1;
                                    }
                                    if (convertedArray[o].swimmers[7]) {
                                        convertedArray[o].swimmers[7].que = 8;
                                    }
                                }


                                // ალაგებს que ების მიხედვით რომელიც თავდაპირველად ჩაფუშე არეიში. შემდეგ მიანიჭე მას სპეციალური ნომრები LanesQuantityInPoolის დახმარებით და შემდეგ გამოიტანე ეკრანზე. 
                                // ConvertedArray ში დალაგებულია მოცურავეები გცურვებშ და გაცურვებიც!!!!! :))))
                                convertedArray[o].swimmers.sort((a, b) => {
                                    return a.que - b.que;
                                });


                                for (l = 0; l < convertedArray[o].swimmers.length; l++) {
                                    convertedArray[o].swimmers[l].preResult = convertedArray[o].swimmers[l].preResult.split('.')[0] + ':' + convertedArray[o].swimmers[l].preResult.split('.')[1].split(':')[0] + '.' + convertedArray[o].swimmers[l].preResult.split('.')[1].split(':')[1];
                                    $('#secondDayHeats').append('<div class="swimmersData2"><nav></nav><nav>' + 'ბილიკი ' + convertedArray[o].swimmers[l].que + '.</nav><nav>' + convertedArray[o].swimmers[l].swimmerName + '</nav><nav>' + convertedArray[o].swimmers[l].club + '</nav><nav>' + convertedArray[o].swimmers[l].age + '</nav><nav>' + convertedArray[o].swimmers[l].preResult + '</nav>')
                                }

                                $('#secondDayHeats').append('</br></br>')
                            }
                            $('#secondDayHeats').append('</br></br></br></br></br>')
                            convertedArray = [];
                        }

                    }
                }
            }

            alreadyCreated = 1;
        }
    })

    //მენიუს დახმარებით გამოჩენა და გაქრობა

    $('#showFirst').on('click', function () {
        $('#firsts').show();
        $('#seconds').hide()
        $('#thirds').hide()
    })
    $('#showSecond').on('click', function () {
        $('#firsts').hide();
        $('#seconds').show()
        $('#thirds').hide()
    })
    $('#showThird').on('click', function () {
        $('#thirds').show()
        $('#firsts').hide();
        $('#seconds').hide()
    })
    $('#showAll').on('click', function () {
        $('#thirds').show()
        $('#firsts').show();
        $('#seconds').show()
    })

    //შეჯიბრის სახელის გამოჩენა
    $('.buttonShow').on('click', function () {
        $('#compName').show();
    })

    let oneShot = 0;
    if (oneShot == 0) {
        for (i = 0; i < competitionListing.dayFirst.length; i++) {
            $('#firstDayProgram').append('<div>' + competitionListing.dayFirst[i] + '</div>')
        }
        for (i = 0; i < competitionListing.daySecond.length; i++) {
            $('#secondDayProgram').append('<div>' + competitionListing.daySecond[i] + '</div>')
        }
        oneShot = 1;
    }
    $('#program').on('click', function () {
        $('#programDiv').show();
        $('#compName').show();
        $('#heats').hide();
        $('#startList').hide();
        $('#showHeatsButton').hide();
        $('#printHeats').hide();
    })

   $('#printHeats').on('click',function(){
    $('#printHeats').hide();
    $('.buttonShow').hide();
    $('.buttonsMenu').hide();
       window.print()
       $('#printHeats').show();
       $('.buttonShow').show();
       $('.buttonsMenu').show();
   })
})