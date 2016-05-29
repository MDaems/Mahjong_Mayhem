describe('game', function(){
    var gameFactory;
    var scope;
    var gameCtrl;
    var httpBackend;


    beforeEach(function(){
        module('Mahjong');

        inject(function($rootScope, $controller, $injector){

            httpBackend = $injector.get('$httpBackend');
            scope = $rootScope.$new();
            gameFactory = $injector.get('GameFactory');
            gameCtrl = $controller('GameController',{$scope: scope});

        })
    });

    describe('addGame', function () {

        it('adding a game', function () {
            expect(new gameFactory({id: 1, minPlayers: 5, maxPlayers: 8, players: 2, state: 'open'})).to.have.property('id', '1');
        });

    });
});