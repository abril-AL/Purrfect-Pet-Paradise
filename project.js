import { defs, tiny } from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

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
    }

    display(context, program_state) {
        super.display(context, program_state);
        let model_transform = Mat4.identity();

        this.shapes.cat.draw(context, program_state, model_transform, this.materials.plastic);
    }
}
