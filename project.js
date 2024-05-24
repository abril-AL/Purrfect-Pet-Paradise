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
        this.arrays.texture_coord = Vector.cast(
            [0, 0], [1, 0], [1, 1], [0, 1],
            [1, 0], [1, 1], [0, 1], [0, 0],
            [0, 0], [1, 0], [1, 1], [0, 1],
            [0, 0], [1, 0], [1, 1], [0, 1],
            [0, 0], [1, 0], [1, 1], [0, 1],
            [0, 0], [1, 0], [1, 1], [0, 1]
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

class small_Cube extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5], // Front face
            [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5], [0.5, -0.5, -0.5], // Back face
            [-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5], // Top face
            [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5], // Bottom face
            [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5], [0.5, -0.5, 0.5], // Right face
            [-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5] // Left face
        );
        this.arrays.normal = Vector3.cast(
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], // Front face
            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], // Back face
            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], // Top face
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], // Bottom face
            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], // Right face
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0] // Left face
        );
        this.arrays.texture_coord = Vector.cast(
            [0, 0], [1, 0], [1, 1], [0, 1], // Front face
            [0, 0], [1, 0], [1, 1], [0, 1], // Back face
            [0, 0], [1, 0], [1, 1], [0, 1], // Top face
            [0, 0], [1, 0], [1, 1], [0, 1], // Bottom face
            [0, 0], [1, 0], [1, 1], [0, 1], // Right face
            [0, 0], [1, 0], [1, 1], [0, 1] // Left face
        );
        this.indices.push(
            0, 1, 2, 0, 2, 3, // Front face
            4, 5, 6, 4, 6, 7, // Back face
            8, 9, 10, 8, 10, 11, // Top face
            12, 13, 14, 12, 14, 15, // Bottom face
            16, 17, 18, 16, 18, 19, // Right face
            20, 21, 22, 20, 22, 23 // Left face
        );
    }
}

class Leg extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-1, -2, 1], [1, -2, 1], [1, 2, 1], [-1, 2, 1],
            [-1, -2, -1], [-1, 2, -1], [1, 2, -1], [1, -2, -1],
            [-1, 2, -1], [-1, 2, 1], [1, 2, 1], [1, 2, -1],
            [-1, -2, -1], [1, -2, -1], [1, -2, 1], [-1, -2, 1],
            [1, -2, -1], [1, 2, -1], [1, 2, 1], [1, -2, 1],
            [-1, -2, -1], [-1, -2, 1], [-1, 2, 1], [-1, 2, -1]
        );
        this.arrays.normal = Vector3.cast(
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1],
            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0]
        );
        this.arrays.texture_coord = Vector.cast(
            [0, 0], [1, 0], [1, 1], [0, 1], // Front face
            [0, 0], [1, 0], [1, 1], [0, 1], // Back face
            [0, 0], [1, 0], [1, 1], [0, 1], // Top face
            [0, 0], [1, 0], [1, 1], [0, 1], // Bottom face
            [0, 0], [1, 0], [1, 1], [0, 1], // Right face
            [0, 0], [1, 0], [1, 1], [0, 1] // Left face
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

class Body extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-2.5, -3, 8.5], [2.5, -3, 8.5], [2.5, 3, 8.5], [-2.5, 3, 8.5],
            [-2.5, -3, -8.5], [-2.5, 3, -8.5], [2.5, 3, -8.5], [2.5, -3, -8.5],
            [-2.5, 3, -8.5], [-2.5, 3, 8.5], [2.5, 3, 8.5], [2.5, 3, -8.5],
            [-2.5, -3, -8.5], [2.5, -3, -8.5], [2.5, -3, 8.5], [-2.5, -3, 8.5],
            [2.5, -3, -8.5], [2.5, 3, -8.5], [2.5, 3, 8.5], [2.5, -3, 8.5],
            [-2.5, -3, -8.5], [-2.5, -3, 8.5], [-2.5, 3, 8.5], [-2.5, 3, -8.5]
        );
        this.arrays.normal = Vector3.cast(
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1],
            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0]
        );
        this.arrays.texture_coord = Vector.cast(
            [0, 0], [1, 0], [1, 1], [0, 1], // Front face
            [0, 0], [1, 0], [1, 1], [0, 1], // Back face
            [0, 0], [1, 0], [1, 1], [0, 1], // Top face
            [0, 0], [1, 0], [1, 1], [0, 1], // Bottom face
            [0, 0], [1, 0], [1, 1], [0, 1], // Right face
            [0, 0], [1, 0], [1, 1], [0, 1]  // Left face
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

class Head extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-2.5, -2, 3], [2.5, -2, 3], [2.5, 2, 3], [-2.5, 2, 3], // Front face
            [-2.5, -2, -3], [-2.5, 2, -3], [2.5, 2, -3], [2.5, -2, -3], // Back face
            [-2.5, 2, -3], [-2.5, 2, 3], [2.5, 2, 3], [2.5, 2, -3], // Top face
            [-2.5, -2, -3], [2.5, -2, -3], [2.5, -2, 3], [-2.5, -2, 3], // Bottom face
            [2.5, -2, -3], [2.5, 2, -3], [2.5, 2, 3], [2.5, -2, 3], // Right face
            [-2.5, -2, -3], [-2.5, -2, 3], [-2.5, 2, 3], [-2.5, 2, -3] // Left face
        );
        this.arrays.normal = Vector3.cast(
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], // Front face
            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], // Back face
            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], // Top face
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], // Bottom face
            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], // Right face
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0] // Left face
        );
        this.arrays.texture_coord = Vector.cast(
            [0, 0], [1, 0], [1, 1], [0, 1], // Front face
            [0, 0], [1, 0], [1, 1], [0, 1], // Back face
            [0, 0], [1, 0], [1, 1], [0, 1], // Top face
            [0, 0], [1, 0], [1, 1], [0, 1], // Bottom face
            [0, 0], [1, 0], [1, 1], [0, 1], // Right face
            [0, 0], [1, 0], [1, 1], [0, 1] // Left face
        );
        this.indices.push(
            0, 1, 2, 0, 2, 3, // Front face
            4, 5, 6, 4, 6, 7, // Back face
            8, 9, 10, 8, 10, 11, // Top face
            12, 13, 14, 12, 14, 15, // Bottom face
            16, 17, 18, 16, 18, 19, // Right face
            20, 21, 22, 20, 22, 23 // Left face
        );
    }
}

class Mouth extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-1.5, -1, 0.5], [1.5, -1, 0.5], [1.5, 1, 0.5], [-1.5, 1, 0.5], // Front face
            [-1.5, -1, -0.5], [-1.5, 1, -0.5], [1.5, 1, -0.5], [1.5, -1, -0.5], // Back face
            [-1.5, 1, -0.5], [-1.5, 1, 0.5], [1.5, 1, 0.5], [1.5, 1, -0.5], // Top face
            [-1.5, -1, -0.5], [1.5, -1, -0.5], [1.5, -1, 0.5], [-1.5, -1, 0.5], // Bottom face
            [1.5, -1, -0.5], [1.5, 1, -0.5], [1.5, 1, 0.5], [1.5, -1, 0.5], // Right face
            [-1.5, -1, -0.5], [-1.5, -1, 0.5], [-1.5, 1, 0.5], [-1.5, 1, -0.5] // Left face
        );
        this.arrays.normal = Vector3.cast(
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], // Front face
            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], // Back face
            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], // Top face
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], // Bottom face
            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], // Right face
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0] // Left face
        );
        this.arrays.texture_coord = Vector.cast(
            [0, 0], [1, 0], [1, 1], [0, 1], // Front face
            [0, 0], [1, 0], [1, 1], [0, 1], // Back face
            [0, 0], [1, 0], [1, 1], [0, 1], // Top face
            [0, 0], [1, 0], [1, 1], [0, 1], // Bottom face
            [0, 0], [1, 0], [1, 1], [0, 1], // Right face
            [0, 0], [1, 0], [1, 1], [0, 1]  // Left face
        );
        this.indices.push(
            0, 1, 2, 0, 2, 3, // Front face
            4, 5, 6, 4, 6, 7, // Back face
            8, 9, 10, 8, 10, 11, // Top face
            12, 13, 14, 12, 14, 15, // Bottom face
            16, 17, 18, 16, 18, 19, // Right face
            20, 21, 22, 20, 22, 23 // Left face
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

        // Body
        this.body = new Body();

        // Head
        this.head = new Head();
        this.mouth = new Mouth();
        this.right_ear = new small_Cube();
        this.left_ear = new small_Cube();

        // Tail - 4 parts
        this.tail_1 = new small_Cube();
        this.tail_2 = new small_Cube();
        this.tail_3 = new small_Cube();
        this.tail_4 = new small_Cube();
    }

    draw_stand(context, program_state, model_transform, leg_material, body_material, head_material, mouth_material, ear_material, tail_material) {
        model_transform = model_transform.times(Mat4.translation(-5, -5, -5));

        // Legs
        let leg_translation = 1.5;
        let z_leg_separation = 9.5;

        let front_left_leg_transform = model_transform.times(Mat4.translation(-leg_translation, 0, 2));
        this.front_left_leg.draw(context, program_state, front_left_leg_transform, leg_material);

        let front_right_leg_transform = model_transform.times(Mat4.translation(leg_translation, 0, 2));
        this.front_right_leg.draw(context, program_state, front_right_leg_transform, leg_material);

        let back_left_leg_transform = model_transform.times(Mat4.translation(-leg_translation, 0, -z_leg_separation));
        this.back_left_leg.draw(context, program_state, back_left_leg_transform, leg_material);

        let back_right_leg_transform = model_transform.times(Mat4.translation(leg_translation, 0, -z_leg_separation));
        this.back_right_leg.draw(context, program_state, back_right_leg_transform, leg_material);

        // Body
        let body_transform = model_transform.times(Mat4.translation(0, 5, -3.5)); // Adjust the height as needed
        this.body.draw(context, program_state, body_transform, body_material);

        // Head
        this.head.draw(context, program_state, model_transform.times(Mat4.translation(0, 7, 6.5)), head_material);
        this.mouth.draw(context, program_state, model_transform.times(Mat4.translation(0, 6, 10)), mouth_material);

        // Ears
        this.right_ear.draw(context, program_state, model_transform.times(Mat4.translation(2, 9.5, 4.5)).times(Mat4.scale(1, 1, 2)), ear_material);
        this.left_ear.draw(context, program_state, model_transform.times(Mat4.translation(-2, 9.5, 4.5)).times(Mat4.scale(1, 1, 2)), ear_material);

        // Tail
        this.tail_1.draw(context, program_state, model_transform.times(Mat4.translation(0, 6, -13.5)).times(Mat4.scale(1, 1, 3)), tail_material);
        this.tail_2.draw(context, program_state, model_transform.times(Mat4.translation(0, 5, -15.5)), tail_material);
        this.tail_3.draw(context, program_state, model_transform.times(Mat4.translation(0, 4, -16.5)), tail_material);
        this.tail_4.draw(context, program_state, model_transform.times(Mat4.translation(0, 3, -19.5)).times(Mat4.scale(1, 1, 5)), tail_material);

        model_transform = Mat4.identity();
    }

    draw_sit(context, program_state, model_transform, materials) {
        model_transform = model_transform;
    }

}


class Brush extends Shape {
    constructor() {
        super("position", "normal");
        this.head = new defs.Capped_Cylinder(15, 15);
        this.handle = new defs.Rounded_Capped_Cylinder(15, 15);
        this.brush = new defs.Closed_Cone(15, 15);
    }

    draw_brush(context, program_state, model_transform, material) {
        model_transform = model_transform.times(Mat4.scale(2, 2, .5));
        this.head.draw(context, program_state, model_transform, material);

        model_transform = model_transform.times(Mat4.scale(1 / 2, 3 / 2, 1 / 3))
            .times(Mat4.translation(0, -1, 0))
        this.handle.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.scale(2, 1 / 3, 2))
            .times(Mat4.translation(-.4, 4, 1));

        model_transform = model_transform.times(Mat4.scale(1 / 4, 1 / 4, 2))
            .times(Mat4.translation(.5, .5, .5))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(2.25, 0, 0))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(-3.5, -2.25, 0))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(2.25, 0, 0))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(2.25, 0, 0))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(-4.5, -2.25, 0))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(2.25, 0, 0))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(2.25, 0, 0))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(-4.5, -2.25, 0))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(2.25, 0, 0))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(2.25, 0, 0))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(-3.5, -2.25, 0))
        this.brush.draw(context, program_state, model_transform, material);
        model_transform = model_transform.times(Mat4.translation(2.25, 0, 0))
        this.brush.draw(context, program_state, model_transform, material);
    }
}

class Base_Scene extends Scene {
    constructor() {
        super();
        this.hover = this.swarm = false;
        this.shapes = {
            'cube': new Cube(),
            'cat': new Cat(),
            sq_tile: new defs.Square(),
            cube_tile: new defs.Cube(),
            sphere: new defs.Subdivision_Sphere(4),
            'brush': new Brush(),
        };

        const bump = new defs.Fake_Bump_Map(1);
        const textured = new defs.Textured_Phong(1);
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#ffffff") }),
            green_grass: new Material(bump,
                { ambient: .5, texture: new Texture("assets/green-grass-512x512.png") }),
            sky_blue: new Material(textured,
                { ambient: .5, texture: new Texture("assets/sky.png") }),
            sun: new Material(textured,
                { ambient: 1, texture: new Texture("assets/sun_softer.png") }),
            test: new Material(new defs.Phong_Shader(),
                { ambient: 1, diffusivity: .6, color: hex_color("#786f80") }),
            cat_body: new Material(bump,
                { ambient: .5, texture: new Texture("assets/cat_body.png") }),
            cat_general: new Material(bump,
                { ambient: .5, texture: new Texture("assets/cat_general.png") }),
            cat_head: new Material(bump,
                { ambient: .5, texture: new Texture("assets/cat_head.png") }),
            cat_mouth: new Material(bump,
                { ambient: .5, texture: new Texture("assets/cat_head.png") }),

            cat_black: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#000000") }),
            cat_grey: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#808080") }),

            eye_b: new Material(bump,
                { ambient: .5, texture: new Texture("assets/face.png") }),
            eye_g: new Material(bump,
                { ambient: .5, texture: new Texture("assets/grey_face.png") }),
            nose_tile: new Material(bump,
                { ambient: .5, texture: new Texture("assets/nose.png") }),
        };

        this.cat_sit = false;
        this.brush_out = false;

        this.cat_color_set = ['b', 'g'];
        this.cat_color = 'b';//default
        this.cat_color_index = 0;
    }

    display(context, program_state) {
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            program_state.set_camera(/*Mat4.rotation(Math.PI / 6, 0, -1, 0).times*/(Mat4.translation(3, -2, -20)));
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        const light_position = vec4(-15, 10, 10, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 100000)];
    }
}

export class Project extends Base_Scene {
    make_control_panel() {
        /*this.key_triggered_button("Change Colors", ["c"], this.set_colors);
        this.key_triggered_button("Outline", ["o"], () => {
            this.outline = !this.outline;
        });*/
        this.key_triggered_button("Sit", ["m"], () => {
            this.cat_sit = !this.cat_sit;
        });
        this.key_triggered_button("Changle Fur Color", ["g"], () => {
            if (this.cat_color_index == 0) {
                this.cat_color_index += 1;
            }
            else {
                this.cat_color_index = 0;
            }
            this.cat_color = this.cat_color_set[this.cat_color_index];
        });

        this.key_triggered_button("Brush", ["b"], () => {
            this.brush_out = !this.brush_out;
        });
    }

    display(context, program_state) {
        super.display(context, program_state);
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
        let model_transform = Mat4.identity();

        let cat_mat;
        let eye_texture;
        if (this.cat_color == 'b') {
            cat_mat = this.materials.cat_black;
            eye_texture = this.materials.eye_b;
        }
        if (this.cat_color == 'g') {
            cat_mat = this.materials.cat_grey;
            eye_texture = this.materials.eye_g;
        }
        //add more colors later


        if (this.cat_sit == false) {
            model_transform = model_transform.times(Mat4.scale(1 / 2, 1 / 2, 1 / 2)).times(Mat4.translation(0, -7, -2));
            this.shapes.cat.draw_stand(context, program_state, model_transform,
                cat_mat, cat_mat, cat_mat,
                cat_mat, cat_mat, cat_mat);//fix paramaters later
            //eyes 
            this.shapes.cube_tile.draw(context, program_state, model_transform.times(Mat4.scale(2.2, 2, 0.1))
                .times(Mat4.translation(-2.3, 1, 45)), eye_texture);
            //nose
            this.shapes.cube_tile.draw(context, program_state, model_transform.times(Mat4.scale(1 / 4, 1 / 4, 1 / 20))
                .times(Mat4.translation(-20.3, 6.5, 110)), this.materials.nose_tile);

            if (this.brush_out) {
                model_transform = model_transform.times(Mat4.translation(-5, 4, -10))
                    .times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
                let brush_transform = model_transform.copy()
                brush_transform = brush_transform.times(Mat4.translation(0, 5 * Math.cos(t), 0));
                this.shapes.brush.draw_brush(context, program_state, brush_transform, this.materials.test);
            }
        }
        else {
            // Sitting cat animation 
            this.shapes.draw_sit(context, program_state, model_transform, this.materials.test);
        }

        // model_transform = model_transform.times(Mat4.translation(15, 0, 0))
        // this.shapes.brush.draw_brush(context, program_state, model_transform, this.materials.test);

        //this.shapes.cat.draw(context, program_state, model_transform, this.materials.plastic);

        // Center ground tile
        model_transform = Mat4.identity();
        model_transform = model_transform.times(Mat4.translation(0, -8, 0)).times(Mat4.scale(20, 1, 20));
        this.shapes.cube_tile.draw(context, program_state, model_transform, this.materials.green_grass);

        // Left ground tile
        model_transform = Mat4.identity();
        model_transform = model_transform.times(Mat4.translation(-40, -8, 0)).times(Mat4.scale(20, 1, 20));
        this.shapes.cube_tile.draw(context, program_state, model_transform, this.materials.green_grass);

        // Right ground tile
        model_transform = Mat4.identity();
        model_transform = model_transform.times(Mat4.translation(40, -8, 0)).times(Mat4.scale(20, 1, 20));
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
        sun_transform = sun_transform.times(Mat4.translation(-20, 10, -10));
        sun_transform = sun_transform.times(Mat4.scale(2, 2, 2));
        this.shapes.sphere.draw(context, program_state, sun_transform, this.materials.sun.override({ color: sun_color }));

    }
}
