import { StrengthPipe } from "./strength.pipe";

describe('strengthPipe', () => 
{
    it('should display weak if the strengh is 5',() => {

        let pipe = new StrengthPipe();

        expect(pipe.transform(5)).toEqual('5 (weak)');
    })

    it('should display strong if the strengh is 10',() => {

        let pipe = new StrengthPipe();

        expect(pipe.transform(10)).toEqual('10 (strong)');
    })
})
