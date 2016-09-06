(function() {
    angular
        .module('coderdojo-signup')
        .controller('TextController', TextController);

    TextController.$inject = [
        'TextConstants'
    ];

    function TextController(TextConstants) {
        var vm = this;

        vm.text = TextConstants;
    }
})();
