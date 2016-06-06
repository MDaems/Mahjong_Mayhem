describe("GameController", function() {
    var GameController;
    var gameService;
    var createNewController;
    var httpBackend;
    var scope;

    // initialize the app
    beforeEach(module('Mahjong'));

    // Inject the modules and get them in global variables
    beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector){
        // The scope for the controller
        scope = $rootScope.$new();
        // Get the service which will be injected
        gameService = $injector.get('GameService');
        // For mocking the backend
        httpBackend = $httpBackend;

        // This is the controller we're going to test
        gameController = $controller('GameController', { $scope: scope });
    }));

    describe('canJoin', function(){
        it('should return false when already full', function(){
            // Given
            var game = {
                maxPlayers: 5,
                minPlayers: 2,
                players: [ {} , {}, {}, {}, {}],
                state: "open",
            }

            // When
            canJoin = gameController.canJoinGame(game);

            // Then
            expect(canJoin).to.equal(false);

        });

        it('should return false when already not open', function(){
            // Given
            var game = {
                players: [
                    {
                        _id: "mha.daems@student.avans.nl",
                        name: "Micky Daems",
                        __v: 0
                    }
                ],
                maxPlayers: 5,
                minPlayers: 2,
                state: "closed",
            }

            // When
            canJoin = gameController.canJoinGame(game);

            // Then
            expect(canJoin).to.equal(false);
        });

        it('should return true when game is open and not full ', function(){
            // Given
            var game = {
                players: [
                    {
                        _id: "mha.daems@student.avans.nl",
                        name: "Micky Daems",
                        __v: 0
                    }
                ],
                maxPlayers: 5,
                minPlayers: 2,
                state: "open",
            }

            // When
            canJoin = gameController.canJoinGame(game);

            // Then
            expect(canJoin).to.equal(true);
        });
    })

    describe('canStart', function(){
        it('should return false when game created by other player', function(){
            // Given
            var game = {
                createdBy: {
                    _id: "mha.daems@student.avans.nl",
                    name: "Micky Daems",
                    __v: 0
                },
                players: [ {} , {}, {}, {}, {}],
            }
            window.localStorage['username'] = "r.vanasseldonk@student.avans.nl";

            // When
            canStart = gameController.canStartGame(game);

            // Then
            expect(canStart).to.equal(false);

        });
    })

    /* it('should save game', function(){
         // Given
         var game = {templateName: "Ram", maxPlayers: "5", minPlayers: "2"}
         var expectedError = 'Created';

         httpBackend
             .expectPOST('http://mahjongmayhem.herokuapp.com/Games', game )
             .respond(201, { err: expectedError });


         // When
         gameController.addGame(game);
         httpBackend.flush(); // Voer synchroon uit ipv asynchroon

         // Then
         expect(scope.error).to.equal(expectedError);
     });*/

 /*   it('should mock the httpbackend', function(){
        // Given
        var game = gameService.games[0];
        var expectedCode = 'WEBS6';
        var expectedError = 'Person not found';
        // Nu expecten we het omdat we in de test zitten.
        // Bij de before of beforeEach kunnen we ook whenPost stubben
        httpBackend
            .expectPOST('http://api.myApp.com/persons/' + person.id + '/courses', { code: expectedCode })
            .respond(404, { err: expectedError });

        // When
        gameController.addCourse(person, expectedCode);
        httpBackend.flush(); // Voer synchroon uit ipv asynchroon

        // Then
        expect(scope.error).to.equal(expectedError);
        expect(person.courses).to.have.length(0);
    });*/
});