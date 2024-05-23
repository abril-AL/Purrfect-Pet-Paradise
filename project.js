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


    draw_stand(context, program_state, model_transform, material) {
        model_transform = model_transform.times(Mat4.translation(-5, -5, -5))

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

        // Body
        let body_transform = model_transform.times(Mat4.translation(0, 5, -3.5)); // Adjust the height as needed
        this.body.draw(context, program_state, body_transform, material);

        // Head
        this.head.draw(context, program_state, model_transform.times(Mat4.translation(0, 7, 6.5)), material);
        this.mouth.draw(context, program_state, model_transform.times(Mat4.translation(0, 6, 10)), material)

        // Ears
        this.right_ear.draw(context, program_state, model_transform.times(Mat4.translation(2, 9.5, 4.5)).times(Mat4.scale(1, 1, 2)), material)
        this.left_ear.draw(context, program_state, model_transform.times(Mat4.translation(-2, 9.5, 4.5)).times(Mat4.scale(1, 1, 2)), material)

        // Tail
        this.tail_1.draw(context, program_state, model_transform.times(Mat4.translation(0, 6, -13.5)).times(Mat4.scale(1, 1, 3)), material);
        this.tail_2.draw(context, program_state, model_transform.times(Mat4.translation(0, 5, -15.5)), material);
        this.tail_3.draw(context, program_state, model_transform.times(Mat4.translation(0, 4, -16.5)), material);
        this.tail_4.draw(context, program_state, model_transform.times(Mat4.translation(0, 3, -19.5)).times(Mat4.scale(1, 1, 5)), material);

        model_transform = Mat4.identity();
    }

    draw_sit(context, program_state, model_transform, materials) {
        model_transform = model_transform;
    }

}

class Base_Scene extends Scene {
    constructor() {
        super();
        this.hover = this.swarm = false;
        this.shapes = {
            'cube': new Cube(),
            'cat': new Cat(),
        };

        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#ffffff") }),
            test: new Material(new defs.Phong_Shader(),
                { ambient: 1, diffusivity: .6, color: hex_color("#786f80") })
        };

        this.cat_sit = false;
    }

    display(context, program_state) {
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            program_state.set_camera(/*Mat4.rotation(Math.PI / 6, 0, -1, 0).times*/(Mat4.translation(0, 0, -30)));
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
    }

    display(context, program_state) {
        super.display(context, program_state);
        let model_transform = Mat4.identity();

        if (this.cat_sit == false) {
            this.shapes.cat.draw_stand(context, program_state, model_transform, this.materials.test);
        }
        else {
            // Sitting cat animation
            this.shapes.draw_sit(context, program_state, model_transform, this.materials.test);
        }
    }
}
