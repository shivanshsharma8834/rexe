import * as PIXI from 'pixi.js';
import { Vector3 } from "./vector";
import { Ray } from './ray';

const HEIGHT : number = 720;
const WIDTH  : number = 1280;
const SCALE : number = 2;
// const ASPECT_RATIO : number = 16.0 / 9.0;

// const focal_length = 1.0;
const camera_center = new Vector3(0, 0, 0);


function ray_color(ray : Ray) {
  const unit_direction =  ray.direction.normalize();
  const a = 0.5 * unit_direction.y + 1.0;

  return {
    r : (1.0 - a + a * 0.5) * 255,
    g : (1.0 - a + a * 0.7) * 255,
    b : (1.0 - a + a * 1.0) * 255,
  }

}




(
  async() => {
    const app = new PIXI.Application();

    await app.init({ antialias: true, resizeTo: window });

    document.body.appendChild(app.canvas);

    const graphics = new PIXI.Graphics();

    for (let i = 0; i < WIDTH; i += SCALE) {
      for (let j = 0; j < HEIGHT; j += SCALE) {
        

        let pixel_center = new Vector3(i - WIDTH/2, j - HEIGHT/2, 0);

        console.log(pixel_center);
        const ray_direction = pixel_center.sub(camera_center);

        const ray = new Ray(pixel_center, ray_direction);

        const color_pixel = ray_color(ray);
        graphics.rect(i, j, SCALE, SCALE);
        const color = new PIXI.Color(color_pixel);
        graphics.fill(color);        

      }
    }

    

    app.stage.addChild(graphics);



  }
)
();
  