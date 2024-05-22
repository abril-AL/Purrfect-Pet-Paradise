import { defs, tiny } from './examples/common.js';
import {Collision_Demo, Simulation, Body} from "./examples/collisions-demo.js";

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

class Plane extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-50, 0, -50], [-50, 0, 50], [50, 0, 50], [50, 0, -50]
        );
        this.arrays.normal = Vector3.cast(
            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]
        );
        this.indices.push(
            0, 1, 2, 2, 3, 0
        );
    }
}

class ball_fall extends Simulation {
    // ** Inertia_Demo** demonstration: This scene lets random initial momentums
    // carry several bodies until they fall due to gravity and bounce.
    constructor() {
        super();
        this.shapes.ball = new defs.Subdivision_Sphere(4)
        this.shapes.plane = new Plane();
        const shader = new defs.Fake_Bump_Map(1);
        this.material = new Material(shader, {
            color: color(.4, .8, .4, 1),
            ambient: .4
        })
    }

    update_state(dt) {
        // update_state():  Override the base time-stepping code to say what this particular
        // scene should do to its bodies every frame -- including applying forces.
        // Generate additional moving bodies if there ever aren't enough:
        while (this.bodies.length < 1)
            this.bodies.push(new Body(this.shapes.ball, this.random_color(), vec3(1, 1 + Math.random(), 1))
                .emplace(Mat4.translation(0, 5, 0),
                    vec3(0, -1, 0).times(3), 0));

        for (let b of this.bodies) {
            // Gravity on Earth, where 1 unit in world space = 1 meter:
            b.linear_velocity[1] += dt * -9.8;
            // If about to fall through floor, reverse y velocity:
            if (b.center[1] < 0 && b.linear_velocity[1] < 0)
                b.linear_velocity[1] *= -.8;
        }
        // Delete bodies that stop or stray too far away:
        //this.bodies = this.bodies.filter(b => b.center.norm() < 50 && b.linear_velocity.norm() > 1/2);
        if (this.bodies[0].linear_velocity[1] < 0.01 && this.bodies[0].center[1] < 0.01){
            this.bodies[0].linear_velocity[1] = 0;
        }
    }

    display(context, program_state) {
        // display(): Draw everything else in the scene besides the moving bodies.
        super.display(context, program_state);

        /*if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            this.children.push(new defs.Program_State_Viewer());
            program_state.set_camera(Mat4.translation(0, 0, -50));    // Locate the camera here (inverted matrix).
        }
        program_state.projection_transform = Mat4.perspective(Math.PI / 4, context.width / context.height, 1, 500);
        program_state.lights = [new Light(vec4(0, -5, -10, 1), color(1, 1, 1, 1), 100000)];
        // Draw the ground:
        this.shapes.plane.draw(context, program_state, Mat4.translation(0, -10, 0)
                .times(Mat4.rotation(Math.PI / 2, 1, 0, 0)).times(Mat4.scale(50, 50, 1)),
            this.material.override(this.data.textures.earth));*/

        this.shapes.cat.draw(context, program_state, model_transform, this.materials.plastic);
        this.shapes.plane.draw(context, program_state, Mat4.translation(0, -3, 0)
                .times(Mat4.scale(50, 50, 1)),
            this.materials.plastic);
    }
}


class Cube extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1],
            [-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1],
            [-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1],
            [1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]
        );
        this.arrays.normal = Vector3.cast(
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1],
            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0]
        );
        this.indices.push(
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        );
    }
}

class Leg extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-1, -3, 1], [1, -3, 1], [1, 3, 1], [-1, 3, 1], // Front face
            [-1, -3, -1], [1, -3, -1], [1, 3, -1], [-1, 3, -1] // Back face
        );
        this.arrays.normal = Vector3.cast(
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], // Front face
            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1] // Back face
        );
        this.indices.push(
            0, 1, 2, 0, 2, 3, // Front face
            4, 5, 6, 4, 6, 7, // Back face
            0, 4, 5, 0, 5, 1, // Left face
            3, 2, 6, 3, 6, 7, // Right face
            3, 7, 6, 3, 6, 2, // Top face
            0, 1, 5, 0, 5, 4  // Bottom face
        );
    }
}

class Cat extends Shape {
    constructor() {
        super("position", "normal");

        // Legs
        this.front_left_leg = new Leg();
        this.front_right_leg = new Leg();
        this.back_left_leg = new Leg();
        this.back_right_leg = new Leg();
    }


    draw(context, program_state, model_transform, material) {
        // Front left leg
        let front_left_transform = model_transform.times(Mat4.translation(-2, 0, 2));
        this.front_left_leg.draw(context, program_state, front_left_transform, material);

        // Back left leg
        let back_left_transform = model_transform.times(Mat4.translation(-2, 0, -2));
        this.back_left_leg.draw(context, program_state, back_left_transform, material);

        // Front right leg
        let front_right_transform = model_transform.times(Mat4.translation(2, 0, 2));
        this.front_right_leg.draw(context, program_state, front_right_transform, material);

        // Back right leg
        let back_right_transform = model_transform.times(Mat4.translation(2, 0, -2));
        this.back_right_leg.draw(context, program_state, back_right_transform, material);
    }
}

class Base_Scene extends Scene {
    constructor() {
        super();
        this.hover = this.swarm = false;
        this.shapes = {
            'cube': new Cube(),
            'leg': new Leg(),
            'cat': new Cat(),
            'plane': new Plane(),
            'ball': new defs.Subdivision_Sphere(4)
        };

        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#ffffff") }),
        };

        this.white = new Material(new defs.Basic_Shader());
        this.outline = false;
        this.swing = true;

        this.colors = [];
        this.set_colors();
    }

    set_colors() {
        this.colors = [color(1, 0, 0, 1), color(0, 1, 0, 1), color(0, 0, 1, 1)];
    }

    display(context, program_state) {
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            program_state.set_camera((Mat4.rotation(Math.PI / 8, 0, -1, 0)).times(Mat4.translation(-10, -2, -25)));
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        const light_position = vec4(0, 5, 5, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];
    }
}

export class Project extends Base_Scene {
    make_control_panel() {
        this.key_triggered_button("Change Colors", ["c"], this.set_colors);
        this.key_triggered_button("Outline", ["o"], () => {
            this.outline = !this.outline;
        });
        this.key_triggered_button("Sit still", ["m"], () => {
            this.swing = !this.swing;
        });
        this.key_triggered_button("Ball", ["b"], () => {
            this.ball ^= 1;
        });
    }

    display(context, program_state) {
        super.display(context, program_state);
        let model_transform = Mat4.identity();

        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;

        this.shapes.cat.draw(context, program_state, model_transform, this.materials.plastic);
        this.shapes.plane.draw(context, program_state, Mat4.translation(0, -3, 0)
                .times(Mat4.scale(50, 50, 1)),
            this.materials.plastic);

        /*if(this.ball) {
            let ball = new ball_fall()
            model_transform = model_transform.times(Mat4.translation(0, 5, 0));
            ball.display(program_state, model_transform);
            //model_transform = model_transform.times(Mat4.translation(0, 2.5 * Math.cos(t) + 3.5, 0));
        }*/
    }
}
