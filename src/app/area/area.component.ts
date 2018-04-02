import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  squares = Array(600).fill(null);

  // area = [0,1,2,3,4,5,6,7,8,9,
  //   10,11,12,13,14,15,16,17,18,19,
  //   20,21,22,23,24,25,26,27,28,29];

  //   fullArea: number[] = [30,30];

    player: string;
    rotate: string;

  start(position) {
      if(!this.squares[position] ){
        this.squares[position] = this.player;
      }
    }

  // constructor(x: number = 0, y: number = 0, bearing = 'north') {
    //     this.at(x,y);
    //     this.orient(bearing);
    // }

  ngOnInit() {
    this.at(15,15);
    this.orient('north');
    this.player = '^';
  }

  exception: string;


    private _player: string;

    // get player():string { return this._player }
    // set player(value: string) { this._player = value}

    private _bearing: string;
    private _coordinates: number[];
    private readonly _possibilities: string[] = ['north', 'east', 'south', 'west'];
    private readonly _course: string[] = ['^', '>', 'v', '<'];
    private readonly _rotation: string[] = ['rotate(90)', 'rotate(180)', 'rotate(270)', 'rotate(0)'];

    get bearing(): string { return this._bearing }
    set bearing(value: string) { this._bearing = value }

    get coordinates(): number[] { return this._coordinates }
    set coordinates(value: number[]) { 

        if( value[0] > 29 ) {
            value[0] = 29;
        } else if 
            ( value[0] < 0 ) {
            value[0] = 0;
        } else if 
            ( value[1] > 30 ) {
            value[1] = 30;
        } else if 
            ( value[1] < 1 ) {
            value[1] = 1;
        } 

        this._coordinates = value 
    }

    get possibilities(): string[] { return this._possibilities }

    get course(): string[] { return this._course }

    get rotation(): string[] { return this._rotation }
    
    

    at(x: number, y: number): void{
        this.coordinates = [x, y];
    }

    orient(currentDirection: string):void {
        if (this.possibilities.indexOf(currentDirection) > -1) {
            this.bearing = currentDirection;
        }
        else {
            // this.exception = 'Invalid StuntCar Bearing';
            throw new Error('Invalid StuntCar Bearing').message; //'Error: Invalid StuntCar Bearing' 
        }
        
    }

    turnRight(): void{
        let orientation: number = this.possibilities.indexOf(this.bearing);

        if(orientation == 3) {
            orientation = 0;
        } else {
            orientation++;
        }

        this.bearing = this.possibilities[orientation];
        this.player = this.course[orientation];
        this.rotate = this.rotation[orientation];
    }

    turnLeft(): void{
        let orientation: number = this.possibilities.indexOf(this.bearing);

        if(orientation == 0) {
            orientation = 3;
        } else {
            orientation--;
        }

        this.bearing = this.possibilities[orientation];
        this.player = this.course[orientation];
        this.rotate = this.rotation[orientation];
    }


    advance(): void {
       let position: number[] = this.coordinates;
       switch( this.bearing ) {
           case 'north': 
                position[1]--;
                break;
            case 'east': 
                position[0]++;
                break;
            case 'south': 
                position[1]++;
                break;
            case 'west': 
                position[0]--;
                break;
       }
    
       this.coordinates = position;
    }

    instructions(command: string): Array<string> {
        let commandArray: Array<string> = command.split("", command.length);
        commandArray.forEach((instruction: string, index: number) => {
            switch(instruction) {
                case 'R':
                instruction = 'turnRight';
                break;
                case 'L':
                instruction = 'turnLeft';
                break;
                case 'A':
                instruction = 'advance';
                break;
            };
            
            commandArray[index] = instruction;
          });
        
        return commandArray;

    }    

    evaluate(command: string): void {
        let commands: Array<string> = this.instructions(command);

        for (let command of commands) {
            this[command]();
        }   
    }

}
