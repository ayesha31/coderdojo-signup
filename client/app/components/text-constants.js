(function () {
    angular
        .module('coderdojo-signup')
        .service('TextConstants', TextConstants);

    TextConstants.$inject = [
        'isGirlsDojo',
        'eventInfo'
    ];

    function TextConstants(isGirlsDojo, eventInfo) {
        var text = {
            title: eventInfo.name,
            information: 'The ' + eventInfo.name + ' will be run from' + eventInfo.date + 'Sessions will run from 4:30pm till 6pm on the Podium level at Bankwest place.',
            activities: [
                'Scratch',
                'Game Maker',
                'LEGO Mindstorm Robots',
                'Website Development',
                'Other'
            ],
            photoWaiver: 'By participating in this CoderDojo Event, you understand that photos/video may be taken of your child and/or yourself by Bankwest '
                + 'and/or CoderDojo WA and that these photos/videos may be used in social or other media to promote Bankwest\'s support of CoderDojo and the '
                + 'CoderDojo movement. By attending, you agree to the use of your and/or your child\'s image for the purposes of promoting CoderDojo/Bankwest.',
            photoWaiverSubtext: 'By checking this box, you understand and give permission for CoderDojo WA and Bankwest to use photomedia of your child and/or '
                + 'yourself at the Dojo event to promote the CoderDojo movement.',
            acceptedMessage: 'You have successfully signed up for ' + eventInfo.name + (isGirlsDojo ? ' ' : ' We will be sending you a calendar invite shortly. ')
                + 'Please remember that if a ninja is under the age of 12 an adult must attend the sessions with them and accompany them at all times. '
                + 'Space is limited for this event so if you find any of the ninjas you registered can no longer attend please let us know as soon as possible.',
            closedMessage: 'Thank you for your interest in Bankwest CoderDojo. We regret to inform you that sign ups are now closed. '
                + 'We have either reached capacity or the registration time period has passed. Keep an eye out for ways to get involved in Bankwest CoderDojo '
                + 'events in the future.',
            errorMessage: 'An error has occurred, either try again or let us know that an error has occurred at coderdojo@bankwest.com.au.'
        };


        if (isGirlsDojo) {
            text.information = 'The Girls CoderDojo Event at Bankwest, consisting of all female mentors and female ninjas, will be held on '
                + eventInfo.date
                + ' from 10:00am to 3:00pm at Bankwest Place located in the Perth CBD. During that time period the ninjas will get to choose from a number of '
                + 'different stations where they can build and program robots, create websites or animate scenes and create games. At the end of the event we '
                + 'will be holding a showcase, where the ninjas get to show off the amazing things they created. The event will include morning tea and '
                + 'afternoon snacks but please be advised that all ninjas and parents or guardians who may be accompanying them are expected to bring their own '
                + 'lunch.';

            text.activities[1] = 'Edison Robots';
        }


        return text;
    }
})();
