import { defs, tiny, Torus } from './examples/common.js';

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

class Circle extends Shape {
    constructor(radius = 1, segments = 32) {
        super("position", "normal", "texture_coord");

        const positions = [];
        const normals = [];
        const texture_coords = [];
        const indices = [];

        // Center point of the circle
        positions.push(vec3(0, 0, 0));
        normals.push(vec3(0, 1, 0));
        texture_coords.push(vec(0.5, 0.5));

        // Outer vertices of the circle
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * 2 * Math.PI;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            positions.push(vec3(x, 0, z));
            normals.push(vec3(0, 1, 0));
            texture_coords.push(vec(x / 2 + 0.5, z / 2 + 0.5));
        }

        // Indices to form triangles
        for (let i = 1; i <= segments; i++) {
            indices.push(0, i, i + 1);
        }

        this.arrays.position = positions;
        this.arrays.normal = normals;
        this.arrays.texture_coord = texture_coords;
        this.indices = indices;
    }

    draw(context, program_state, model_transform, material) {
        super.draw(context, program_state, model_transform, material);
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
        let tail_transform = model_transform.times(Mat4.translation(0,8, -12.5));
        for (let i = 0; i < 5; i++) {

            this.tail_4.draw(context, program_state, tail_transform, tail_material);
            let t2 = program_state.animation_time / 1000;
            let w = 2*Math.PI/3;
            let angle =  0.04 *Math.PI *Math.sin (w*t2);
            tail_transform = tail_transform.times(Mat4.translation(0,1, 0));
            tail_transform = tail_transform.times(Mat4.translation(0,-1,0));
            tail_transform = tail_transform.times(Mat4.rotation(angle,0,0,1));
            tail_transform = tail_transform.times(Mat4.translation(0,1,0));
        }
        model_transform = Mat4.identity();
    }

    draw_sit(context, program_state, model_transform, materials) {
        model_transform = model_transform;
    }

    draw_unhappy_stand(context, program_state, model_transform, leg_material, body_material, head_material, mouth_material, ear_material, tail_material) {
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
        let tail_transform = model_transform.times(Mat4.translation(0,8, -12.5));
        for (let i = 0; i < 5; i++) {

            this.tail_4.draw(context, program_state, tail_transform, tail_material);
            let t2 = program_state.animation_time / 1000;
            let w = 2*Math.PI/3;
            let angle =  0.04 *Math.PI *Math.sin (w*t2);
            tail_transform = tail_transform.times(Mat4.translation(0,1, 0));
            //tail_transform = tail_transform.times(Mat4.translation(0,-1,0));
           // tail_transform = tail_transform.times(Mat4.rotation(angle,0,0,1));
            //tail_transform = tail_transform.times(Mat4.translation(0,1,0));
        }
        model_transform = Mat4.identity();
    }

    draw_eating(context, program_state, model_transform, material, head_sin_transform) {

        model_transform = model_transform.times(Mat4.translation(-5, -5, -5));
        head_sin_transform = head_sin_transform.times(Mat4.translation(0, -2, 0));

        // Legs
        let leg_translation = 1.5;
        let z_leg_separation = 9.5;

        let front_left_leg_transform = model_transform.times(Mat4.translation(-leg_translation, 0, 2));
        this.front_left_leg.draw(context, program_state, front_left_leg_transform, material);

        let front_right_leg_transform = model_transform.times(Mat4.translation(leg_translation, 0, 2));
        this.front_right_leg.draw(context, program_state, front_right_leg_transform, material);

        let back_left_leg_transform = model_transform.times(Mat4.translation(-leg_translation, 0, -z_leg_separation));
        this.back_left_leg.draw(context, program_state, back_left_leg_transform, material);

        let back_right_leg_transform = model_transform.times(Mat4.translation(leg_translation, 0, -z_leg_separation));
        this.back_right_leg.draw(context, program_state, back_right_leg_transform, material);

        // Tail
        let tail_transform2 = model_transform.times(Mat4.translation(0,8, -12.5));
        for (let i = 0; i < 5; i++) {

            this.tail_4.draw(context, program_state, tail_transform2, material);
            let t3 = program_state.animation_time / 1000;
            let w3 = 2*Math.PI/3;
            let angle =  0.04 *Math.PI *Math.sin (w3*t3);
            tail_transform2 = tail_transform2.times(Mat4.translation(0,1, 0));
            tail_transform2 = tail_transform2.times(Mat4.translation(0,-1,0));
            tail_transform2 = tail_transform2.times(Mat4.rotation(angle,0,0,1));
            tail_transform2 = tail_transform2.times(Mat4.translation(0,1,0));
        }

        // Body
        let body_transform = model_transform
            .times(Mat4.translation(0, 5, -3.5))  // Move to the hinge point
            .times(Mat4.rotation(2 * Math.PI / 180, 1, 0, 0))  // Rotate the body downwards
            .times(Mat4.translation(0, -5, 3.5))  // Move back to the original position
            .times(Mat4.translation(0, 4.3, -3));  // Offset for body height
        this.body.draw(context, program_state, body_transform, material);


        // These Will Tilt to Simulate Eating:
        // Head
        this.head.draw(context, program_state, head_sin_transform.times(Mat4.translation(0, 7, 6.5)).times(Mat4.translation(-5, -5, -5)), material);
        this.mouth.draw(context, program_state, head_sin_transform.times(Mat4.translation(0, 6, 10)).times(Mat4.translation(-5, -5, -5)), material);
        // Ears
        this.right_ear.draw(context, program_state, head_sin_transform.times(Mat4.translation(2, 9.5, 4.5)).times(Mat4.translation(-5, -5, -5)).times(Mat4.scale(1, 1, 2)), material);
        this.left_ear.draw(context, program_state, head_sin_transform.times(Mat4.translation(-2, 9.5, 4.5)).times(Mat4.translation(-5, -5, -5)).times(Mat4.scale(1, 1, 2)), material);


        model_transform = Mat4.identity();
    }

}

class CatRun extends Shape {
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

        let front_left_leg_transform = model_transform.times(Mat4.translation(-leg_translation, 0, 2))
            .times(Mat4.rotation(0.5*Math.sin(program_state.animation_time/500), 1, 0, 0));
        this.front_left_leg.draw(context, program_state, front_left_leg_transform, leg_material);

        let front_right_leg_transform = model_transform.times(Mat4.translation(leg_translation, 0, 2))
            .times(Mat4.rotation(-0.5*Math.sin(program_state.animation_time/500), 1, 0, 0));
        this.front_right_leg.draw(context, program_state, front_right_leg_transform, leg_material);

        let back_left_leg_transform = model_transform.times(Mat4.translation(-leg_translation, 0, -z_leg_separation))
            .times(Mat4.rotation(0.5*Math.sin(program_state.animation_time/500), 1, 0, 0));
        this.back_left_leg.draw(context, program_state, back_left_leg_transform, leg_material);

        let back_right_leg_transform = model_transform.times(Mat4.translation(leg_translation, 0, -z_leg_separation))
            .times(Mat4.rotation(-0.5*Math.sin(program_state.animation_time/500), 1, 0, 0));
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
        let tail_transform = model_transform.times(Mat4.translation(0,8, -12.5));
        for (let i = 0; i < 5; i++) {

            this.tail_4.draw(context, program_state, tail_transform, tail_material);
            let t2 = program_state.animation_time / 1000;
            let w = 2*Math.PI/3;
            let angle =  0.04 *Math.PI *Math.sin (w*t2);
            tail_transform = tail_transform.times(Mat4.translation(0,1, 0));
            tail_transform = tail_transform.times(Mat4.translation(0,-1,0));
            tail_transform = tail_transform.times(Mat4.rotation(angle,0,0,1));
            tail_transform = tail_transform.times(Mat4.translation(0,1,0));
        }
        model_transform = Mat4.identity();
    }

    draw_sit(context, program_state, model_transform, materials) {
        model_transform = model_transform;
    }

    draw_eating(context, program_state, model_transform, material, head_sin_transform) {

        model_transform = model_transform.times(Mat4.translation(-5, -5, -5));
        head_sin_transform = head_sin_transform.times(Mat4.translation(0, -2, 0));

        // Legs
        let leg_translation = 1.5;
        let z_leg_separation = 9.5;

        let front_left_leg_transform = model_transform.times(Mat4.translation(-leg_translation, 0, 2));
        this.front_left_leg.draw(context, program_state, front_left_leg_transform, material);

        let front_right_leg_transform = model_transform.times(Mat4.translation(leg_translation, 0, 2));
        this.front_right_leg.draw(context, program_state, front_right_leg_transform, material);

        let back_left_leg_transform = model_transform.times(Mat4.translation(-leg_translation, 0, -z_leg_separation));
        this.back_left_leg.draw(context, program_state, back_left_leg_transform, material);

        let back_right_leg_transform = model_transform.times(Mat4.translation(leg_translation, 0, -z_leg_separation));
        this.back_right_leg.draw(context, program_state, back_right_leg_transform, material);

        // Tail
        let tail_transform2 = model_transform.times(Mat4.translation(0,8, -12.5));
        for (let i = 0; i < 5; i++) {

            this.tail_4.draw(context, program_state, tail_transform2, material);
            let t3 = program_state.animation_time / 1000;
            let w3 = 2*Math.PI/3;
            let angle =  0.04 *Math.PI *Math.sin (w3*t3);
            tail_transform2 = tail_transform2.times(Mat4.translation(0,1, 0));
            tail_transform2 = tail_transform2.times(Mat4.translation(0,-1,0));
            tail_transform2 = tail_transform2.times(Mat4.rotation(angle,0,0,1));
            tail_transform2 = tail_transform2.times(Mat4.translation(0,1,0));
        }

        // Body
        let body_transform = model_transform
            .times(Mat4.translation(0, 5, -3.5))  // Move to the hinge point
            .times(Mat4.rotation(2 * Math.PI / 180, 1, 0, 0))  // Rotate the body downwards
            .times(Mat4.translation(0, -5, 3.5))  // Move back to the original position
            .times(Mat4.translation(0, 4.3, -3));  // Offset for body height
        this.body.draw(context, program_state, body_transform, material);


        // These Will Tilt to Simulate Eating:
        // Head
        this.head.draw(context, program_state, head_sin_transform.times(Mat4.translation(0, 7, 6.5)).times(Mat4.translation(-5, -5, -5)), material);
        this.mouth.draw(context, program_state, head_sin_transform.times(Mat4.translation(0, 6, 10)).times(Mat4.translation(-5, -5, -5)), material);
        // Ears
        this.right_ear.draw(context, program_state, head_sin_transform.times(Mat4.translation(2, 9.5, 4.5)).times(Mat4.translation(-5, -5, -5)).times(Mat4.scale(1, 1, 2)), material);
        this.left_ear.draw(context, program_state, head_sin_transform.times(Mat4.translation(-2, 9.5, 4.5)).times(Mat4.translation(-5, -5, -5)).times(Mat4.scale(1, 1, 2)), material);


        model_transform = Mat4.identity();
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

class Bowl extends Shape {
    constructor() {
        super("position", "normal");
        this.bowl = new Torus(25, 25);
        this.kibble = new Circle();
    }
    draw(context, program_state, model_transform, material, material_2) {
        model_transform = model_transform.times(Mat4.translation(-5, -6, 7)).times(Mat4.rotation(Math.PI / 2, 1, 0, 0)).times(Mat4.scale(4, 4, 1))
        for (let i = 0; i < 23; i++) {
            this.bowl.draw(context, program_state, model_transform.times(Mat4.translation(0, 0, i * 0.07)), material);
        }
        model_transform = Mat4.identity()
        model_transform = model_transform.times(Mat4.translation(-2.5, -6.3, 2.7)).times(Mat4.scale(1.5, 1.5, 1.5))
        this.kibble.draw(context, program_state, model_transform, material_2);
    }

}

class Ball {
    // **Body** can store and update the properties of a 3D body that incrementally
    // moves from its previous place due to velocities.  It conforms to the
    // approach outlined in the "Fix Your Timestep!" blog post by Glenn Fiedler.
    constructor(shape, material, size) {
        Object.assign(this,
            { shape, material, size })
    }

    // (within some margin of distance).
    static intersect_cube(p, margin = 0) {
        return p.every(value => value >= -1 - margin && value <= 1 + margin)
    }

    static intersect_sphere(p, margin = 0) {
        return p.dot(p) < 1 + margin;
    }

    emplace(location_matrix, linear_velocity, angular_velocity, spin_axis = vec3(0, 0, 0).randomized(1).normalized()) {                               // emplace(): assign the body's initial values, or overwrite them.
        this.center = location_matrix.times(vec4(0, 0, 0, 1)).to3();
        this.rotation = Mat4.translation(...this.center.times(-1)).times(location_matrix);
        this.previous = { center: this.center.copy(), rotation: this.rotation.copy() };
        // drawn_location gets replaced with an interpolated quantity:
        this.drawn_location = location_matrix;
        this.temp_matrix = Mat4.identity();
        return Object.assign(this, { linear_velocity, angular_velocity, spin_axis })
    }

    advance(time_amount) {
        // advance(): Perform an integration (the simplistic Forward Euler method) to
        // advance all the linear and angular velocities one time-step forward.
        this.previous = { center: this.center.copy(), rotation: this.rotation.copy() };
        // Apply the velocities scaled proportionally to real time (time_amount):
        // Linear velocity first, then angular:
        this.center = this.center.plus(this.linear_velocity.times(time_amount));
        this.rotation.pre_multiply(Mat4.rotation(time_amount * this.angular_velocity, ...this.spin_axis));
    }

    // The following are our various functions for testing a single point,
    // p, against some analytically-known geometric volume formula

    blend_rotation(alpha) {
        // blend_rotation(): Just naively do a linear blend of the rotations, which looks
        // ok sometimes but otherwise produces shear matrices, a wrong result.

        // TODO:  Replace this function with proper quaternion blending, and perhaps
        // store this.rotation in quaternion form instead for compactness.
        return this.rotation.map((x, i) => vec4(...this.previous.rotation[i]).mix(x, alpha));
    }

    blend_state(alpha) {
        // blend_state(): Compute the final matrix we'll draw using the previous two physical
        // locations the object occupied.  We'll interpolate between these two states as
        // described at the end of the "Fix Your Timestep!" blog post.
        this.drawn_location = Mat4.translation(...this.previous.center.mix(this.center, alpha))
            .times(this.blend_rotation(alpha))
            .times(Mat4.scale(...this.size));
    }

    check_if_colliding(b, collider) {
        // check_if_colliding(): Collision detection function.
        // DISCLAIMER:  The collision method shown below is not used by anyone; it's just very quick
        // to code.  Making every collision body an ellipsoid is kind of a hack, and looping
        // through a list of discrete sphere points to see if the ellipsoids intersect is *really* a
        // hack (there are perfectly good analytic expressions that can test if two ellipsoids
        // intersect without discretizing them into points).
        if (this == b)
            return false;
        // Nothing collides with itself.
        // Convert sphere b to the frame where a is a unit sphere:
        const T = this.inverse.times(b.drawn_location, this.temp_matrix);

        const { intersect_test, points, leeway } = collider;
        // For each vertex in that b, shift to the coordinate frame of
        // a_inv*b.  Check if in that coordinate frame it penetrates
        // the unit sphere at the origin.  Leave some leeway.
        return points.arrays.position.some(p =>
            intersect_test(T.times(p.to4(1)).to3(), leeway));
    }
}

class Base_Scene extends Scene {
    constructor() {
        super();
        this.hover = this.swarm = false;
        this.shapes = {
            'cube': new Cube(),
            'cat': new Cat(),
            'cat_run': new CatRun(),
            sq_tile: new defs.Square(),
            cube_tile: new defs.Cube(),
            sphere: new defs.Subdivision_Sphere(4),
            'brush': new Brush(),
            'bowl': new Bowl(),
            'unhappy_brush': new Brush(),
        };

        Object.assign(this, { time_accumulator: 0, time_scale: 1, t: 0, dt: 1 / 20, bodies: [], steps_taken: 0 });
        this.direction = 0;
        this.xdir = 0;
        this.zdir = 0;
        const bump = new defs.Fake_Bump_Map(1);
        const textured = new defs.Textured_Phong(1);
        this.materials = {

            // Outside Environment
            green_grass: new Material(bump,
                { ambient: .5, texture: new Texture("assets/green-grass-512x512.png") }),
            sky_blue: new Material(textured,
                { ambient: .5, texture: new Texture("assets/sky.png") }),
            sun: new Material(textured,
                { ambient: 1, texture: new Texture("assets/sun_softer.png") }),
            fence: new Material(bump,
                { ambient: 1, texture: new Texture("assets/fence.png") }),
            flower: new Material(bump,
                { ambient: .8, diffusivity: .4, specularity: 0.4, texture: new Texture("assets/flower.png") }),

            // Cat Textures
            cat_black: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#000000") }),
            cat_grey: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#808080") }),
            cat_white: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#ffffff") }),
            cat_orange: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#e3910e") }),
            eye_b: new Material(bump,
                { ambient: .5, diffusivity: .1, specularity: 0.1, texture: new Texture("assets/black_face.jpg") }),
            eye_g: new Material(bump,
                { ambient: .5, diffusivity: .1, specularity: 0.1, texture: new Texture("assets/grey_face.png") }),
            eye_w: new Material(bump,
                { ambient: .5, diffusivity: .1, specularity: 0.1, texture: new Texture("assets/white_face.png") }),
            eye_o: new Material(bump,
                { ambient: .5, diffusivity: .1, specularity: 0.1, texture: new Texture("assets/orange_face.png") }),
            nose_tile: new Material(bump,
                { ambient: .5, texture: new Texture("assets/nose.png") }),

            // Other
            heart: new Material(bump,
                { ambient: 1, texture: new Texture("assets/heart.png") }),
            upset: new Material(bump,
                { ambient: 1, texture: new Texture("assets/upset.png") }),
            test: new Material(new defs.Phong_Shader(),
                { ambient: 1, diffusivity: .6, color: hex_color("#41004d") }),
            test2: new Material(new defs.Phong_Shader(),
                { ambient: 1, diffusivity: .6, color: hex_color("#ffc0cB") }),
            plastic: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#ffffff") }),
            kibble: new Material(textured,
                { ambient: 1, texture: new Texture("assets/kibble.jpg") }),
            wet_food: new Material(textured,
                { ambient: 1, texture: new Texture("assets/wet_food.jpg") }),
            bone: new Material(textured,
                { ambient: 1, texture: new Texture("assets/bone.jpg") }),
            bowl_color: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#d1001f") }),
            meter_red: new Material(new defs.Phong_Shader(),
                { ambient: 1, diffusivity: .6, color: hex_color("#ff0000") }),
            meter_yellow: new Material(new defs.Phong_Shader(),
                { ambient: 1, diffusivity: .6, color: hex_color("#efcc00") }),
            meter_green: new Material(new defs.Phong_Shader(),
                { ambient: 1, diffusivity: .6, color: hex_color("#008000") }),
            happy: new Material(bump,
                { ambient: 1, texture: new Texture("assets/happy.jpg") }),

            // Inside Environment
            wall: new Material(bump,
                { ambient: 1, texture: new Texture("assets/wall.jpg") }),
            plant: new Material(bump,
                { ambient: .8, diffusivity: .4, specularity: 0.4, texture: new Texture("assets/plant.png") }),
            floor: new Material(bump,
                { ambient: .8, diffusivity: .4, specularity: 0.4, texture: new Texture("assets/floor.jpg") }),
            painting: new Material(bump,
                { ambient: .8, diffusivity: .4, specularity: 0.4, texture: new Texture("assets/painting.jpg") }),
            couch: new Material(bump,
                { ambient: .8, diffusivity: .4, specularity: 0.4, texture: new Texture("assets/couch.png") }),


            // Space Environment
            star_bk: new Material(bump,
                { ambient: 1, texture: new Texture("assets/star_bk.jpg") }),
            moon: new Material(bump,
                { ambient: 1, texture: new Texture("assets/moon.jpg") }),
            earth: new Material(textured,
                { ambient: 1, texture: new Texture("assets/earth.png") }),
            alien: new Material(bump,
                { ambient: .8, diffusivity: .4, specularity: 0.4, texture: new Texture("assets/alien.png") }),
            astro: new Material(bump,
                { ambient: .8, diffusivity: .4, specularity: 0.4, texture: new Texture("assets/astro.png") }),

        };

        this.cat_sit = false;
        this.brush_out = false;
        this.unhappy_brush_out = false;
        this.ball = false;

        this.cat_color_set = ['b', 'g', 'w', 'o',];
        this.cat_color = 'b';//default
        this.cat_color_index = 0;

        this.envr_set = ['outside', 'inside', 'space'];
        this.envr = 'outside';//default
        this.envr_index = 0;

        this.cat_feed = false;

        this.food_set = ['kibble', 'wet', 'bone'];
        this.food = 'kibble';//default
        this.food_index = 0;

        this.happiness_level = 100;
        this.happy_i = 0.1;
    }

    simulate(frame_time) {
        // simulate(): Carefully advance time according to Glenn Fiedler's
        // "Fix Your Timestep" blog post.
        // This line gives ourselves a way to trick the simulator into thinking
        // that the display framerate is running fast or slow:
        frame_time = this.time_scale * frame_time;

        // Avoid the spiral of death; limit the amount of time we will spend
        // computing during this timestep if display lags:
        this.time_accumulator += Math.min(frame_time, 0.1);
        // Repeatedly step the simulation until we're caught up with this frame:
        while (Math.abs(this.time_accumulator) >= this.dt) {
            // Single step of the simulation for all bodies:
            this.update_state(this.dt);
            for (let b of this.bodies)
                b.advance(this.dt);
            // Following the advice of the article, de-couple
            // our simulation time from our frame rate:
            this.t += Math.sign(frame_time) * this.dt;
            this.time_accumulator -= Math.sign(frame_time) * this.dt;
            this.steps_taken++;
        }
        // Store an interpolation factor for how close our frame fell in between
        // the two latest simulation time steps, so we can correctly blend the
        // two latest states and display the result.
        let alpha = this.time_accumulator / this.dt;
        for (let b of this.bodies) b.blend_state(alpha);
    }


    display(context, program_state) {
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            program_state.set_camera(Mat4.translation(3, -2, -30));
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        const light_position = vec4(-20, 30, 0, 0);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 10000000)];

        if (this.ball)
            this.simulate(program_state.animation_delta_time);
        // Draw each shape at its current location:
        for (let b of this.bodies)
            b.shape.draw(context, program_state, b.drawn_location, b.material);

    }

    update_state(dt)      // update_state(): Your subclass of Simulation has to override this abstract function.
    {
        throw "Override this"
    }
}

export class Project extends Base_Scene {
    make_control_panel() {
        this.key_triggered_button("Change Environment", ["e"], () => {
            if (this.envr_index < 2) {
                this.envr_index += 1;
            } else {
                this.envr_index = 0
            }
            this.envr = this.envr_set[this.envr_index];
        });
        /*this.key_triggered_button("Sit", ["m"], () => {
            this.cat_sit = !this.cat_sit;
        });*/
        this.new_line();
        this.key_triggered_button("Change Fur Color", ["g"], () => {
            if (this.cat_color_index < 3) {
                this.cat_color_index += 1;
            }
            else {
                this.cat_color_index = 0;
            }
            this.cat_color = this.cat_color_set[this.cat_color_index];
        });
        this.new_line();
        this.key_triggered_button("Brush", ["b"], () => {
            this.brush_out = !this.brush_out;
            this.cat_feed = false;
            this.ball = false;
            this.unhappy_brush_out = false;
            this.happiness_level += 0.5;
        });
        this.new_line();
        this.key_triggered_button("Change Brush", ["u"], () => {
            this.unhappy_brush_out = !this.unhappy_brush_out;
            this.cat_feed = false;
            this.ball = false;
            this.brush_out = false;
            this.happiness_level -= 0.5;
        });
        this.new_line();
        this.key_triggered_button("Feed", ["h"], () => {
            this.cat_feed = !this.cat_feed;
            this.brush_out = false;
            this.ball = false;
            this.unhappy_brush_out = false;
            this.happiness_level += 0.5;
        });
        this.new_line();
        this.key_triggered_button("Change Food Type", ["t"], () => {
            this.happiness_level += 0.5;
            if (this.food_index < 2) {
                this.food_index += 1;
            } else {
                this.food_index = 0
            }
            this.food = this.food_set[this.food_index];
        });
        this.new_line();
        this.key_triggered_button("Play with ball", ["x"], () => {
            this.direction = Math.floor(Math.random() * 2);
            this.xdir = Math.random();
            this.zdir = Math.random();
            this.ball = !this.ball;
            this.brush_out = false;
            this.cat_feed = false;
            this.unhappy_brush_out = false;
            this.happiness_level += 0.5
        });
    }

    updateHappinessLevel() {
        // Decrease the happiness level over time
        if (this.happiness_level > 0) {
            this.happiness_level -= this.happy_i; // Adjust the decrease rate as needed
        }
        if (this.happiness_level < 0) {
            this.happiness_level = 0;
        }
        if (this.happiness_level >= 100) {
            this.happiness_level = 100;
        }
        console.log(this.happiness_level)
    }
    getHappinessColor(happiness_level) {
        // Define the color thresholds
        let red_threshold = 25; // Below this, the color will be red

        // Calculate the color based on the happiness level
        if (happiness_level < red_threshold) {
            return new Vector(1, 0, 0, 1); // Red color
        } else {
            // Calculate a gradient color from red to green based on the happiness level
            let green_value = (happiness_level - red_threshold) / (100 - red_threshold);
            return new Vector(1 - green_value, green_value, 0, 1); // Gradient color from red to green
        }
    }

    random_color() {
        return this.materials.plastic.override(color(.6, .6 * Math.random(), .6 * Math.random(), 1));
    }

    //function for ball bouncing following gravity (i.e. physics-based)
    update_state(dt) {
        // update_state():  Override the base time-stepping code to say what this particular
        // scene should do to its bodies every frame -- including applying forces.
        // Generate additional moving bodies if there ever aren't enough:
        while (this.bodies.length < 2) {
            if (this.direction == 0) {
                this.bodies.push(new Ball(this.shapes.sphere, this.random_color(), vec3(1, 1, 1))
                    .emplace(Mat4.translation(-2.5, 15, 3),
                        vec3(this.xdir, -1, this.zdir).times(3), 0));
            }
            else {
                this.bodies.push(new Ball(this.shapes.sphere, this.random_color(), vec3(1, 1, 1))
                    .emplace(Mat4.translation(-2.5, 15, 3),
                        vec3(-this.xdir, -1, this.zdir).times(3), 0));
            }
        }

        for (let b of this.bodies) {
            // Gravity on Earth, where 1 unit in world space = 1 meter:
            b.linear_velocity[1] += dt * -9.8;
            // If about to fall through floor, reverse y velocity:
            if (b.center[1] < -6 && b.linear_velocity[1] < 0)
                b.linear_velocity[1] *= -.8;
        }
        // Delete bodies that stop or stray too far away:
        //this.bodies = this.bodies.filter(b => b.center.norm() < 50 && b.linear_velocity.norm() > 1/2);
        if (this.bodies[0].linear_velocity[1] < 0.01 && this.bodies[0].center[1] < -5.95) {
            this.bodies[0].linear_velocity[1] = 0;
        }

    }

    display(context, program_state) {
        super.display(context, program_state);
        let t = program_state.animation_time / 1000, cdt = program_state.animation_delta_time / 100;
        let model_transform = Mat4.identity();

        let cat_mat;
        let eye_texture;
        // Cat color
        if (this.cat_color == 'b') {
            cat_mat = this.materials.cat_black;
            eye_texture = this.materials.eye_b;
        }
        if (this.cat_color == 'g') {
            cat_mat = this.materials.cat_grey;
            eye_texture = this.materials.eye_g;
        }
        if (this.cat_color == 'w') {
            cat_mat = this.materials.cat_white;
            eye_texture = this.materials.eye_w;
        }
        if (this.cat_color == 'o') {
            cat_mat = this.materials.cat_orange;
            eye_texture = this.materials.eye_o;
        }

        if (this.cat_sit == false) {
            if (this.brush_out) {
                t = program_state.animation_time / 1000
                this.happy_i = -0.15;
                model_transform = Mat4.identity().times(Mat4.scale(1 / 2, 1 / 2, 1 / 2)).times(Mat4.translation(0, -7, -2));
                this.shapes.cat.draw_stand(context, program_state, model_transform,
                    cat_mat, cat_mat, cat_mat,
                    cat_mat, cat_mat, cat_mat);//fix paramaters later
                //eyes
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(2.2, 2, 0.1))
                    .times(Mat4.translation(-2.3, 1, 45)), eye_texture);
                //nose
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(1 / 3, 1 / 3, 1 / (20 / 3)))
                    .times(Mat4.translation(-15.5, 4.4, 37)).times(Mat4.scale(1.2, 1.2, 1.2)), this.materials.nose_tile);

                model_transform = model_transform.times(Mat4.translation(-5, 4, -10))
                    .times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
                let brush_transform = model_transform.copy()
                brush_transform = brush_transform.times(Mat4.translation(0, 5 * Math.cos(t), 0));
                this.shapes.brush.draw_brush(context, program_state, brush_transform, this.materials.test);

                //happy cat
                model_transform = Mat4.identity();
                this.shapes.cube_tile.draw(context, program_state, model_transform.times(Mat4.scale(1 / 2, 1 / 2, 0)).times(Mat4.translation(-9, -2, 3)), this.materials.heart);

            } else if (this.unhappy_brush_out == true) {
                t = program_state.animation_time / 1000
                this.happy_i = 0.2;
                model_transform = Mat4.identity().times(Mat4.scale(1 / 2, 1 / 2, 1 / 2)).times(Mat4.translation(0, -7, -2));
                this.shapes.cat.draw_unhappy_stand(context, program_state, model_transform,
                    cat_mat, cat_mat, cat_mat,
                    cat_mat, cat_mat, cat_mat);//fix paramaters later
                //eyes
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(2.2, 2, 0.1))
                    .times(Mat4.translation(-2.3, 1, 45)), eye_texture);
                //nose
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(1 / 3, 1 / 3, 1 / (20 / 3)))
                    .times(Mat4.translation(-15.5, 4.4, 37)).times(Mat4.scale(1.2, 1.2, 1.2)), this.materials.nose_tile);

                model_transform = model_transform.times(Mat4.translation(-5, 4, -10))
                    .times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
                let unhappy_brush_transform = model_transform.copy()
                unhappy_brush_transform = unhappy_brush_transform.times(Mat4.translation(0, 5 * Math.cos(t), 0));
                this.shapes.brush.draw_brush(context, program_state, unhappy_brush_transform, this.materials.test2);

                //unhappy cat
                model_transform = Mat4.identity();
                this.shapes.cube_tile.draw(context, program_state, model_transform.times(Mat4.scale(1 / 2, 1 / 2, 0)).times(Mat4.translation(-1, -2, 3)), this.materials.upset);
            } else if (this.cat_feed == true) {
                t = program_state.animation_time / 1000
                this.happy_i = -0.1;
                model_transform = Mat4.identity().times(Mat4.scale(1 / 2, 1 / 2, 1 / 2)).times(Mat4.translation(0, -7, -2));

                // Tilt Angle
                let head_sin_transform = model_transform
                    .times(Mat4.rotation((25 + 5 * (Math.sin(t))) * Math.PI / 100, 1, 0, 0));
                this.shapes.cat.draw_eating(context, program_state, model_transform, cat_mat, head_sin_transform);
                //eyes
                this.shapes.cube.draw(context, program_state, head_sin_transform.times(Mat4.translation(0, -2, 0)).times(Mat4.scale(2.2, 2, 0.1))
                    .times(Mat4.translation(-2.3, 1, 45)), eye_texture);
                //nose
                this.shapes.cube.draw(context, program_state, head_sin_transform.times(Mat4.translation(0, -2, 0)).times(Mat4.scale(1 / 3, 1 / 3, 1 / (20 / 3)))
                    .times(Mat4.translation(-15.5, 4.4, 37)).times(Mat4.scale(1.2, 1.2, 1.2)), this.materials.nose_tile);

                // Bowl
                let food_mat;
                if (this.food == 'kibble') {
                    this.happy_i = -0.1;
                    food_mat = this.materials.kibble;
                    this.shapes.cube_tile.draw(context, program_state, Mat4.identity().times(Mat4.scale(1 / 2, 1 / 2, 0)).times(Mat4.translation(-9, -2, 3)), this.materials.heart);
                } else if (this.food == 'wet') {
                    this.happy_i = -0.15;
                    food_mat = this.materials.wet_food;
                    this.shapes.cube_tile.draw(context, program_state, Mat4.identity().times(Mat4.scale(1 / 2, 1 / 2, 0)).times(Mat4.translation(-9, -2, 3)), this.materials.heart);
                } else if (this.food == 'bone') {
                    this.happy_i = 0.2;
                    food_mat = this.materials.bone;
                    this.shapes.cube_tile.draw(context, program_state, Mat4.identity().times(Mat4.scale(1 / 2, 1 / 2, 0.01)).times(Mat4.translation(-3, -3.2, 130)), this.materials.upset);
                }
                this.shapes.bowl.draw(context, program_state, model_transform, this.materials.bowl_color, food_mat);

                model_transform = Mat4.identity();
            } else if (this.ball) {
                t = program_state.animation_time / 500
                this.happy_i -= 0.1;
                let rot = Math.atan(Math.sqrt(Math.pow(this.bodies[0].center[0], 2)) / Math.sqrt(Math.pow(this.bodies[0].center[2], 2)));

                if (this.direction == 0) {
                    model_transform = Mat4.identity().times(Mat4.rotation(rot, 0, 1, 0))
                    model_transform = model_transform.times(Mat4.scale(1 / 2, 1 / 2, 1 / 2)).times(Mat4.translation(0, -7, -2 + t * 4));
                    this.shapes.cat_run.draw_stand(context, program_state, model_transform,
                        cat_mat, cat_mat, cat_mat,
                        cat_mat, cat_mat, cat_mat);
                    this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(2.2, 2, 0.1))
                        .times(Mat4.translation(-2.3, 1, 45)), eye_texture);
                    this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(1 / 3, 1 / 3, 1 / (20 / 3)))
                        .times(Mat4.translation(-15.5, 4.4, 37)).times(Mat4.scale(1.2, 1.2, 1.2)), this.materials.nose_tile);
                }
                else {
                    model_transform = Mat4.identity().times(Mat4.rotation(-rot, 0, 1, 0))
                    model_transform = model_transform.times(Mat4.scale(1 / 2, 1 / 2, 1 / 2)).times(Mat4.translation(0, -7, -2 + t * 4));
                    this.shapes.cat_run.draw_stand(context, program_state, model_transform,
                        cat_mat, cat_mat, cat_mat,
                        cat_mat, cat_mat, cat_mat);
                    this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(2.2, 2, 0.1))
                        .times(Mat4.translation(-2.3, 1, 45)), eye_texture);
                    this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(1 / 3, 1 / 3, 1 / (20 / 3)))
                        .times(Mat4.translation(-15.5, 4.4, 37)).times(Mat4.scale(1.2, 1.2, 1.2)), this.materials.nose_tile);
                }

            }
            else {
                this.happy_i = 0.16;

                model_transform = Mat4.identity().times(Mat4.scale(1 / 2, 1 / 2, 1 / 2)).times(Mat4.translation(0, -7, -2));
                this.shapes.cat.draw_stand(context, program_state, model_transform,
                    cat_mat, cat_mat, cat_mat,
                    cat_mat, cat_mat, cat_mat);//fix paramaters later
                //eyes
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(2.2, 2, 0.1))
                    .times(Mat4.translation(-2.3, 1, 45)), eye_texture);
                //nose
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(1 / 3, 1 / 3, 1 / (20 / 3)))
                    .times(Mat4.translation(-15.5, 4.4, 37)).times(Mat4.scale(1.2, 1.2, 1.2)), this.materials.nose_tile);
            }

            if (this.ball == false) {
                this.bodies = []
            }

            if (this.ball == false && this.cat_feed == false && this.brush_out == false  && this.unhappy_brush_out == false) {
                program_state.animation_time = 0
            }

            this.happiness_level += 0.1;
            let scale_factor = 4 * this.happiness_level / 100; // Assuming happiness_level ranges from 0 to 100
            let cube_transform = Mat4.translation(4, 0, 1).times(Mat4.scale(1, scale_factor, 1))      // Scale only along the y-axis

            let color_level;
            if (this.happiness_level <= 30) {
                color_level = this.materials.meter_red;
            } else if (this.happiness_level <= 50) {
                color_level = this.materials.meter_yellow;
            } else if (this.happiness_level <= 110) {
                color_level = this.materials.meter_green;
            }
            let move_t = Mat4.translation(10, -6, -4);
            this.shapes.cube.draw(context, program_state, move_t.times(Mat4.scale(1.2, 1.2, 1.2)), this.materials.happy)
            this.shapes.cube.draw(context, program_state, Mat4.translation(6, -4.8, -5).times(cube_transform), color_level);
            this.updateHappinessLevel();
        }


        if (this.envr == 'outside') {

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
            sun_transform = sun_transform.times(Mat4.translation(-20, 10, -35));
            sun_transform = sun_transform.times(Mat4.scale(2, 2, 2));
            this.shapes.sphere.draw(context, program_state, sun_transform, this.materials.sun.override({ color: sun_color }));

            // Fence
            for (let i = 1; i < 25; i++) {
                model_transform = Mat4.identity();
                model_transform = model_transform.times(Mat4.translation((i * 5) - 60, -4, -20)).times(Mat4.scale(3, 3, 0));
                this.shapes.cube_tile.draw(context, program_state, model_transform, this.materials.fence);
            }

            // Flowers

            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(29, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(24, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(19, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(14, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(9, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(4, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-1, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-6, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-11, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-16, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-21, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-26, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-31, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
            model_transform = Mat4.identity();
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-36, -5, -19)).times(Mat4.scale(2, 2, 0.01)), this.materials.flower);
        }
        else if (this.envr == 'inside') {
            // Back Walls
            model_transform = Mat4.identity().times(Mat4.translation(-40, 3, 20))

            for (let i = 0; i < 4; i++) {
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(40 * i, 10, -50)).times(Mat4.scale(20, 20, 1)), this.materials.wall);
            }

            // Floors
            model_transform = model_transform.times(Mat4.translation(-16, -31, 10))
            for (let i = 0; i < 10; i++) {
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(20 * i, 20, -50)).times(Mat4.scale(10, 1, 10)), this.materials.floor);
            }
            model_transform = model_transform.times(Mat4.translation(0, 0, 20.1))
            for (let i = 0; i < 10; i++) {
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(20 * i, 20, -50)).times(Mat4.scale(10, 1, 10)), this.materials.floor);
            }
            model_transform = model_transform.times(Mat4.translation(0, 0, 20.1))
            for (let i = 0; i < 10; i++) {
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(20 * i, 20, -50)).times(Mat4.scale(10, 1, 10)), this.materials.floor);
            }

            // Plant
            model_transform = Mat4.identity()
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(14, -1, -29)).times(Mat4.scale(6, 6, 0.01)), this.materials.plant);

            // Wall Painting
            model_transform = Mat4.identity()
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-12, 10, -29)).times(Mat4.scale(5, 5, 1)), this.materials.test.override({ color: hex_color("#6B2503") }));
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-12, 10, -28.3)).times(Mat4.scale(4.2, 4.2, 1)), this.materials.painting);

            // Couch
            model_transform = Mat4.identity()
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-28, -.2, -29)).times(Mat4.scale(14, 14, 0.01)), this.materials.couch);

        }
        else if (this.envr == 'space') {
            // Alien
            model_transform = Mat4.identity()
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(30, -1.5, -29)).times(Mat4.scale(6, 6, 0.01)), this.materials.alien);

            // Astronaut
            model_transform = Mat4.identity()
            this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(-30, 3, -29)).times(Mat4.scale(6, 6, 0.01)), this.materials.astro);

            // Back Walls
            model_transform = Mat4.identity().times(Mat4.translation(-40, 3, 20))

            for (let i = 0; i < 4; i++) {
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(40 * i, 10, -50)).times(Mat4.scale(20, 20, 1)), this.materials.star_bk);
            }

            // Floors
            model_transform = model_transform.times(Mat4.translation(-16, -31, 10))
            for (let i = 0; i < 10; i++) {
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(20 * i, 20, -50)).times(Mat4.scale(10, 1, 10)), this.materials.moon);
            }
            model_transform = model_transform.times(Mat4.translation(0, 0, 20.1))
            for (let i = 0; i < 10; i++) {
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(20 * i, 20, -50)).times(Mat4.scale(10, 1, 10)), this.materials.moon);
            }
            for (let i = 0; i < 3; i++) {
                model_transform = model_transform.times(Mat4.translation(0, 0, 20.1))
                for (let i = 0; i < 10; i++) {
                    this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(20 * i, 20, -50)).times(Mat4.scale(10, 1, 10)), this.materials.moon);
                }
            }
            model_transform = Mat4.identity();
            let earth_transform = model_transform.times(Mat4.rotation(-t / 40, 0, 0, 1));
            earth_transform = earth_transform.times(Mat4.scale(2, 2, 2)).times(Mat4.translation(-10, 5, -12)); // Translate to the desired point
            this.shapes.sphere.draw(context, program_state, earth_transform, this.materials.earth);

        }
    }
}