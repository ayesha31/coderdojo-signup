(function () {
    angular
        .module('coderdojo-signup')
        .service('TextConstants', TextConstants);

    TextConstants.$inject = [
    ];

    function TextConstants() {
        return {
            title: 'Bankwest Coder Dojo',
            information: 'The 2nd Term of CoderDojo form 2016 will begin on the Tuesday the 10th of May and will run for 5 weeks. Sessions will run from 4:30pm till 6pm on the Podium level on Bankwest place.',
            activities: [
                'Scratch',
                'Edison Robots',
                'Raspberry Pi',
                'Game Maker',
                'LEGO Mindstorm Robots',
                'Website Development',
                'Other'
            ],
            photoWaiver: 'By participating in this CoderDojo Event, you understand that photos/video may be taken of your child and/or yourself by Bankwest and/or CoderDojo WA and that these photos/videos may be used in social or other media to promote Bankwest\'s support of CoderDojo and the CoderDojo movement. By attending, you agree to the use of your and/or your child\'s image for the purposes of promoting CoderDojo/Bankwest.',
            photoWaiverSubtext: 'By checking this box, you understand and give permission for CoderDojo WA and Bankwest to use photomedia of my child at the Dojo event to promote the CoderDojo movement.'
        };
    }
})();
