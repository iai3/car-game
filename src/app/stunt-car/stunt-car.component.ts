import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stunt-car',
  templateUrl: './stunt-car.component.html',
  styleUrls: ['./stunt-car.component.css']
})
export class StuntCar {

  exception: string;

    private _bearing: string;
    private _coordinates: number[];
    private readonly _possibilities: string[] = ['north', 'east', 'south', 'west'];

    get bearing(): string { return this._bearing }
    set bearing(value: string) { this._bearing = value }

    get coordinates(): number[] { return this._coordinates }
    set coordinates(value: number[]) { 

        if( value[0] > 15 ) {
            value[0] = 15;
        } else if 
            ( value[0] < -15 ) {
            value[0] = -15;
        } else if 
            ( value[1] > 15 ) {
            value[1] = 15;
        } else if 
            ( value[1] < -15 ) {
            value[1] = -15;
        } 

        this._coordinates = value 
    }

    get possibilities(): string[] { return this._possibilities }
    
    // constructor(x: number = 0, y: number = 0, bearing = 'north') {
    //     this.at(x,y);
    //     this.orient(bearing);
    // }

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
    }

    turnLeft(): void{
        let orientation: number = this.possibilities.indexOf(this.bearing);

        if(orientation == 0) {
            orientation = 3;
        } else {
            orientation--;
        }

        this.bearing = this.possibilities[orientation];
    }


    advance(): void {
       let position: number[] = this.coordinates;
       switch( this.bearing ) {
           case 'north': 
                position[1]++;
                break;
            case 'east': 
                position[0]++;
                break;
            case 'south': 
                position[1]--;
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
