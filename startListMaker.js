$(document).ready(function () {

    //სტარტლისტზე დაჭერისას სტარტლისტის გამოტანა
    $('#startListButton').on('click', function () {
        $('#startList').show();
        let heatNameAndSwimmers = {
            'name': ' ',
            'swimmers': [],
        }

        let convertedSeconds;
        let satauri;

        //ეს მარტო პირველი დღეა
        for (i = 0; i < competitionListing.dayFirst.length; i++) {
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

                        //სათაური
                        heatNameAndSwimmers.swimmers[0].gender == 'კაცი' ? satauri = 'კაცები' : satauri = 'ქალები'                     //სათაური
                        heatNameAndSwimmers.swimmers[0].gender == 'კაცი' ? satauri = 'კაცები' : satauri = 'ქალები'
                        $('#firstDay').append('<div class="eventsHeader2">' + heatNameAndSwimmers.name + ' ' + satauri + '</div></br>')
                        $('#firstDay').append('<div class="swimmersData"><nav>სახელი</nav><nav>კლუბი</nav><nav>დაბ.წელი</nav><nav>შედეგი</nav><nav>შეჯიბრი</nav><nav>თარიღი</nav></div><hr>')
                        for (t = 0; t < heatNameAndSwimmers.swimmers.length; t++) {
                            $('#firstDay').append('<div class="swimmersData"><nav>' + heatNameAndSwimmers.swimmers[t].name + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].club + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].age + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].time + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].location + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].date + '</nav></div>')
                        }
                        $('#firstDay').append('</br></br></br></br></br>')
                    }

                }
            }
        }
        //ეს მარტო meore დღეა
        for (i = 0; i < competitionListing.daySecond.length; i++) {
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
                        //სათაური
                        heatNameAndSwimmers.swimmers[0].gender == 'კაცი' ? satauri = 'კაცები' : satauri = 'ქალები';
                        $('#thirdDay').append('<div class="eventsHeader2">' + heatNameAndSwimmers.name + ' ' + satauri + '</div></br>')
                        $('#thirdDay').append('<div class="swimmersData"><nav>სახელი</nav><nav>კლუბი</nav><nav>დაბ.წელი</nav><nav>შედეგი</nav><nav>შეჯიბრი</nav><nav>თარიღი</nav></div><hr>')
                        for (t = 0; t < heatNameAndSwimmers.swimmers.length; t++) {
                            $('#thirdDay').append('<div class="swimmersData"><nav>' + heatNameAndSwimmers.swimmers[t].name + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].club + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].age + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].time + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].location + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].date + '</nav></div>')
                        }
                        $('#thirdDay').append('</br></br></br></br></br>')
                    }

                }
            }
        }
        //ეს მარტო mesame დღეა
        for (i = 0; i < competitionListing.dayThird.length; i++) {
            for (j = 0; j < eventsArray.length; j++) {
                if (competitionListing.dayThird[i] == eventsArray[j].event) {
                    heatNameAndSwimmers = {
                        'name': ' ',
                        'swimmers': [],
                    }
                    for (p = 0; p < eventsArray[j].swimmer.length; p++) {
                        //აქ აკონვერტირებ დროებს წამებში
                        convertedSeconds = parseInt((eventsArray[j].swimmer[p][5].split('.')[0]) * 60) + parseInt(eventsArray[j].swimmer[p][5].split('.')[1].split(':')[0]) + ((eventsArray[j].swimmer[p][5].split('.')[1].split(':')[1]) / 100);
                        //აქ იქმნება არრეები სადაც დალაგებულია გაცურვების
                        heatNameAndSwimmers.name = competitionListing.dayThird[i];
                        heatNameAndSwimmers.swimmers.push({ 'name': eventsArray[j].swimmer[p][0], 'age': eventsArray[j].swimmer[p][1], 'club': eventsArray[j].swimmer[p][2], 'event': eventsArray[j].swimmer[p][3], 'gender': eventsArray[j].swimmer[p][4], 'time': eventsArray[j].swimmer[p][5], 'location': eventsArray[j].swimmer[p][6], 'date': eventsArray[j].swimmer[p][7], 'seconds': convertedSeconds })
                    }

                    if (heatNameAndSwimmers.name != ' ') {
                        // აქ უნდა დაალგო არეები ისე რომ სტარტლისტში მონაწილეები სწორად დალაგდნენ ყველზე ჩქარიდან ყველაზე ნელისკენ
                        heatNameAndSwimmers.swimmers.sort((a, b) => {
                            return a.seconds - b.seconds;
                        });
                        //აქ იწერება დივებში რეების მონცემები
                        //სათაური
                        heatNameAndSwimmers.swimmers[0].gender == 'კაცი' ? satauri = 'კაცები' : satauri = 'ქალები';
                        $('#secondDay').append('<div class="eventsHeader2">' + heatNameAndSwimmers.name + ' ' + satauri + '</div></br>')
                        $('#secondDay').append('<div class="swimmersData"><nav>სახელი</nav><nav>კლუბი</nav><nav>დაბ.წელი</nav><nav>შედეგი</nav><nav>შეჯიბრი</nav><nav>თარიღი</nav></div><hr>')
                        for (t = 0; t < heatNameAndSwimmers.swimmers.length; t++) {
                            $('#secondDay').append('<div class="swimmersData"><nav>' + heatNameAndSwimmers.swimmers[t].name + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].club + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].age + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].time + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].location + '</nav><nav>' + heatNameAndSwimmers.swimmers[t].date + '</nav></div>')
                        }
                        $('#secondDay').append('</br></br></br></br></br>')
                    }

                }
            }
        }
    })
})