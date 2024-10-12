import * as PIXI from 'pixi.js'

const HEIGHT : number = 720;
const WIDTH  : number = 1280;
const SCALE : number = 2;


(
  async() => {
    const app = new PIXI.Application();

    await app.init({ antialias: true, resizeTo: window });

    

    document.body.appendChild(app.canvas);

    const graphics = new PIXI.Graphics();

    for (let i = 0; i < WIDTH; i += SCALE) {
      for (let j = 0; j < HEIGHT; j += SCALE) {
        const color = new PIXI.Color({ r: i % 255, g: j % 255, b: 255 });
        graphics.rect(i, j, SCALE, SCALE);
        graphics.fill(color);
        

      }
    }

    

    app.stage.addChild(graphics);



  }
)
();
  