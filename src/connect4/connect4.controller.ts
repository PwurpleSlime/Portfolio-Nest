import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Connect4Service } from './connect4.service';

@Controller('connect4')
export class Connect4Controller {
  constructor(private readonly connect4Service: Connect4Service) {}
  @Get("/")
  getAllGames(){
    return this.connect4Service.games
  }
  @Post("/startGame")
  startGame(){
    let gameState: number[][] = []
    for (let i = 0; i < 7; i++) {
      gameState.push([0,0,0,0,0,0])
    }
    const id = crypto.randomUUID()
    this.connect4Service.games.push({id: id, gameState: gameState, playerOneTurn: true})
    const returnData = {games: this.connect4Service.games, newId: id}
    return returnData
  }
  @Get("/game/:id")
  joinGame(@Param('id') id:string){
    const game = this.connect4Service.games.filter(game => game.id == id)[0]
    return game
  }
  @Post("/game/:id/")
  playMove(@Param('id') id:string, @Body('slotNumber') slotNumber:number){
    const game = this.connect4Service.games.find(g => g.id === id)
    if (!game) return
    const col = game.gameState[slotNumber - 1]
    if (!col) return
    const emptyIndex = col.lastIndexOf(0)
    col[emptyIndex] = game.playerOneTurn ? 1 : 2
    game.playerOneTurn = !game.playerOneTurn
    
    return game
  }
}
