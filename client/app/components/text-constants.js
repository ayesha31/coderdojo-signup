(function () {
    angular
        .module('coderdojo-signup')
        .service('TextConstants', TextConstants);

    TextConstants.$inject = [
    ];

    function TextConstants() {
        return {
            title: 'Bankwest Coder Dojo',
            information: 'The 3rd term of Bankwest CoderDojo for 2016 will be run around October/November (dates TBA) for 5 weeks.. Sessions will run from 4:30pm till 6pm on the Podium level at Bankwest place.',
            activities: [
                'Scratch',
                'Game Maker',
                'LEGO Mindstorm Robots',
                'Website Development',
                'Other'
            ],
            photoWaiver: 'By participating in this CoderDojo Event, you understand that photos/video may be taken of your child and/or yourself by Bankwest and/or CoderDojo WA and that these photos/videos may be used in social or other media to promote Bankwest\'s support of CoderDojo and the CoderDojo movement. By attending, you agree to the use of your and/or your child\'s image for the purposes of promoting CoderDojo/Bankwest.',
            photoWaiverSubtext: 'By checking this box, you understand and give permission for CoderDojo WA and Bankwest to use photomedia of my child at the Dojo event to promote the CoderDojo movement.',
            acceptedMessage: 'You have successfully signed up for the Bankwest CoderDojo Term 3. We will be sending you a calendar invite shortly. Please remember that if a ninja is under the age of 12 an adult must attend the sessions with them and accompany them at all times. Space is limited for this event so if you find any of the ninjas you registered can no longer attend please let us know as soon as possible.',
            closedMessage: 'Thank you for your interest in Bankwest CoderDojo. We regret to inform you that sign ups are now closed. We have either reached capacity or the registration time period has passed. Keep an eye out for ways to get involved in Bankwest CoderDojo events in the future.',
            errorMessage: 'An error has occurred, either try again or let us know that an error has occurred at coderdojo@bankwest.com.au.'
        };
    }
})();
