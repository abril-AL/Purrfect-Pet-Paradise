import { defs, tiny } from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Texture, Scene,
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
            sq_tile: new defs.Square(),
            cube_tile: new defs.Cube(),
            sphere: new defs.Subdivision_Sphere(4),
        };

        const bump = new defs.Fake_Bump_Map(1);
        const textured = new defs.Textured_Phong(1);
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#ffffff") }),
            green_grass: new Material(bump,
                {ambient: .5, texture: new Texture("assets/green-grass-512x512.png")}),
            sky_blue: new Material(textured,
                {ambient: .5, texture: new Texture("assets/sky.png")}),
            sun: new Material(textured,
                {ambient: 1, texture: new Texture("assets/sun_softer.png")}),
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
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
        let model_transform = Mat4.identity();

        this.shapes.cat.draw(context, program_state, model_transform, this.materials.plastic);

        // Center ground tile
        model_transform = Mat4.identity();
        model_transform = model_transform.times(Mat4.translation(0, -4, 0)).times(Mat4.scale(20, 1, 20));
        this.shapes.cube_tile.draw(context, program_state, model_transform, this.materials.green_grass);

        // Left ground tile
        model_transform = Mat4.identity();
        model_transform = model_transform.times(Mat4.translation(-40, -4, 0)).times(Mat4.scale(20, 1, 20));
        this.shapes.cube_tile.draw(context, program_state, model_transform, this.materials.green_grass);

        // Right ground tile
        model_transform = Mat4.identity();
        model_transform = model_transform.times(Mat4.translation(40, -4, 0)).times(Mat4.scale(20, 1, 20));
        this.shapes.cube_tile.draw(context, program_state, model_transform, this.materials.green_grass);

        // Center sky tile
        model_transform = Mat4.identity();
        model_transform = model_transform.times(Mat4.translation(0, 10, -50)).times(Mat4.scale(50, 50, 1));
        this.shapes.sq_tile.draw(context, program_state, model_transform, this.materials.sky_blue);

        // Left sky tiles
        model_transform = Mat4.identity();
        model_transform = model_transform.times(Mat4.translation(-100, 10, -50)).times(Mat4.scale(50, 50, 1));
        this.shapes.sq_tile.draw(context, program_state, model_transform, this.materials.sky_blue);

        // Right sky tiles
        model_transform = Mat4.identity();
        model_transform = model_transform.times(Mat4.translation(100, 10, -50)).times(Mat4.scale(50, 50, 1));
        this.shapes.sq_tile.draw(context, program_state, model_transform, this.materials.sky_blue);

        const sun_scale = 2 + 1 * (Math.sin(Math.PI * t / 5));
        const sun_color_fraction = (sun_scale - 1) / 2; // Normalize between 0 and 1
        const sun_color = color(1, sun_color_fraction, 0, 1); // Transition from red to yellow
        let sun_transform = Mat4.identity();
        sun_transform = sun_transform.times(Mat4.translation(-6, 6, 0));
        this.shapes.sphere.draw(context, program_state, sun_transform, this.materials.sun.override({color: sun_color}));

    }
}
