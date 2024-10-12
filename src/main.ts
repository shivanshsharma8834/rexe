import * as PIXI from 'pixi.js';
import { Vector3 } from "./vector";
import { Ray } from './ray';

const HEIGHT : number = screen.height;
const WIDTH  : number = screen.width;
const SCALE : number = 3;
// const ASPECT_RATIO : number = 16.0 / 9.0;

const focal_length = 250.0; 
const camera_center = new Vector3(0, 0, 0);



function hit_sphere(center : Vector3, radius : number ,ray : Ray) {
  const oc = center.sub(ray.origin);

  const a = ray.direction.dot(ray.direction);

  const b = -2.0 * ray.direction.dot(oc);

  const c = oc.dot(oc) - radius * radius;

  const discriminant = b * b - 4 * a * c;

  if (discriminant < 0.0) {
    return -1.0;
  } else {
    return (b - Math.sqrt(discriminant) ) / (2.0 * a);
  }

}

function ray_color(ray : Ray) {
  const unit_direction =  ray.direction.normalize();
  const a = 0.5 * unit_direction.y + 1.0;

  const t = hit_sphere(new Vector3(0, 0, 10), 5, ray);
  
  if (t > 0.0) {
    let n = ray.at(t).sub(new Vector3(0, 0, 10)).normalize()
    return {
      r : 0.5 * (n.z + 1) * 255,
      g : 0.5 * (n.y + 1) * 255,
      b : 0.5 * (n.x + 1) * 255,
    }
  }
  console.log(t);

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

    let viewport_center = new Vector3(0, 0, focal_length);


    for (let i = 0; i < WIDTH; i += SCALE) {
      for (let j = 0; j < HEIGHT; j += SCALE) {
        

        let pixel_center = viewport_center.sub(new Vector3(i - WIDTH / 2, j - HEIGHT / 2, focal_length));

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
  