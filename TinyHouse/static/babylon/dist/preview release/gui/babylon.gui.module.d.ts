declare module "babylonjs-gui/2D/controls/focusableControl" {
    import { IKeyboardEvent } from "babylonjs/Events/deviceInputEvents";
    import { Nullable } from "babylonjs/types";
    import { Control } from "babylonjs-gui/2D/controls/control";
    /**
    * Interface used to define a control that can receive focus
    */
    export interface IFocusableControl {
        /**
         * Function called when the control receives the focus
         */
        onFocus(): void;
        /**
         * Function called when the control loses the focus
         */
        onBlur(): void;
        /**
         * Function called to let the control handle keyboard events
         * @param evt defines the current keyboard event
         */
        processKeyboard(evt: IKeyboardEvent): void;
        /**
        * Function called to get the list of controls that should not steal the focus from this control
        * @returns an array of controls
        */
        keepsFocusWith(): Nullable<Control[]>;
        /**
        * Function to focus the control programmatically
        */
        focus(): void;
        /**
        * Function to unfocus the control programmatically
        */
        blur(): void;
    }
}
declare module "babylonjs-gui/2D/valueAndUnit" {
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    /**
     * Class used to specific a value and its associated unit
     */
    export class ValueAndUnit {
        /** defines the unit to store */
        unit: number;
        /** defines a boolean indicating if the value can be negative */
        negativeValueAllowed: boolean;
        private _value;
        private _originalUnit;
        /**
         * Gets or sets a value indicating that this value will not scale accordingly with adaptive scaling property
         * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
         */
        ignoreAdaptiveScaling: boolean;
        /**
         * Creates a new ValueAndUnit
         * @param value defines the value to store
         * @param unit defines the unit to store
         * @param negativeValueAllowed defines a boolean indicating if the value can be negative
         */
        constructor(value: number, 
        /** defines the unit to store */
        unit?: number, 
        /** defines a boolean indicating if the value can be negative */
        negativeValueAllowed?: boolean);
        /** Gets a boolean indicating if the value is a percentage */
        get isPercentage(): boolean;
        /** Gets a boolean indicating if the value is store as pixel */
        get isPixel(): boolean;
        /** Gets direct internal value */
        get internalValue(): number;
        /**
         * Gets value as pixel
         * @param host defines the root host
         * @param refValue defines the reference value for percentages
         * @returns the value as pixel
         */
        getValueInPixel(host: AdvancedDynamicTexture, refValue: number): number;
        /**
         * Update the current value and unit. This should be done cautiously as the GUi won't be marked as dirty with this function.
         * @param value defines the value to store
         * @param unit defines the unit to store
         * @returns the current ValueAndUnit
         */
        updateInPlace(value: number, unit?: number): ValueAndUnit;
        /**
         * Gets the value accordingly to its unit
         * @param host  defines the root host
         * @returns the value
         */
        getValue(host: AdvancedDynamicTexture): number;
        /**
         * Gets a string representation of the value
         * @param host defines the root host
         * @param decimals defines an optional number of decimals to display
         * @returns a string
         */
        toString(host: AdvancedDynamicTexture, decimals?: number): string;
        /**
         * Store a value parsed from a string
         * @param source defines the source string
         * @returns true if the value was successfully parsed
         */
        fromString(source: string | number): boolean;
        private static _Regex;
        private static _UNITMODE_PERCENTAGE;
        private static _UNITMODE_PIXEL;
        /** UNITMODE_PERCENTAGE */
        static get UNITMODE_PERCENTAGE(): number;
        /** UNITMODE_PIXEL */
        static get UNITMODE_PIXEL(): number;
    }
}
declare module "babylonjs-gui/2D/style" {
    import { Observable } from "babylonjs/Misc/observable";
    import { IDisposable } from "babylonjs/scene";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    import { ValueAndUnit } from "babylonjs-gui/2D/valueAndUnit";
    /**
     * Define a style used by control to automatically setup properties based on a template.
     * Only support font related properties so far
     */
    export class Style implements IDisposable {
        private _fontFamily;
        private _fontStyle;
        private _fontWeight;
        /** @hidden */
        _host: AdvancedDynamicTexture;
        /** @hidden */
        _fontSize: ValueAndUnit;
        /**
         * Observable raised when the style values are changed
         */
        onChangedObservable: Observable<Style>;
        /**
         * Creates a new style object
         * @param host defines the AdvancedDynamicTexture which hosts this style
         */
        constructor(host: AdvancedDynamicTexture);
        /**
         * Gets or sets the font size
         */
        get fontSize(): string | number;
        set fontSize(value: string | number);
        /**
         * Gets or sets the font family
         */
        get fontFamily(): string;
        set fontFamily(value: string);
        /**
         * Gets or sets the font style
         */
        get fontStyle(): string;
        set fontStyle(value: string);
        /** Gets or sets font weight */
        get fontWeight(): string;
        set fontWeight(value: string);
        /** Dispose all associated resources */
        dispose(): void;
    }
}
declare module "babylonjs-gui/2D/math2D" {
    import { Nullable } from "babylonjs/types";
    import { Vector2 } from "babylonjs/Maths/math.vector";
    /**
     * Class used to transport Vector2 information for pointer events
     */
    export class Vector2WithInfo extends Vector2 {
        /** defines the current mouse button index */
        buttonIndex: number;
        /**
         * Creates a new Vector2WithInfo
         * @param source defines the vector2 data to transport
         * @param buttonIndex defines the current mouse button index
         */
        constructor(source: Vector2, 
        /** defines the current mouse button index */
        buttonIndex?: number);
    }
    /** Class used to provide 2D matrix features */
    export class Matrix2D {
        /** Gets the internal array of 6 floats used to store matrix data */
        m: Float32Array;
        /**
         * Creates a new matrix
         * @param m00 defines value for (0, 0)
         * @param m01 defines value for (0, 1)
         * @param m10 defines value for (1, 0)
         * @param m11 defines value for (1, 1)
         * @param m20 defines value for (2, 0)
         * @param m21 defines value for (2, 1)
         */
        constructor(m00: number, m01: number, m10: number, m11: number, m20: number, m21: number);
        /**
         * Fills the matrix from direct values
         * @param m00 defines value for (0, 0)
         * @param m01 defines value for (0, 1)
         * @param m10 defines value for (1, 0)
         * @param m11 defines value for (1, 1)
         * @param m20 defines value for (2, 0)
         * @param m21 defines value for (2, 1)
         * @returns the current modified matrix
         */
        fromValues(m00: number, m01: number, m10: number, m11: number, m20: number, m21: number): Matrix2D;
        /**
         * Gets matrix determinant
         * @returns the determinant
         */
        determinant(): number;
        /**
         * Inverses the matrix and stores it in a target matrix
         * @param result defines the target matrix
         * @returns the current matrix
         */
        invertToRef(result: Matrix2D): Matrix2D;
        /**
         * Multiplies the current matrix with another one
         * @param other defines the second operand
         * @param result defines the target matrix
         * @returns the current matrix
         */
        multiplyToRef(other: Matrix2D, result: Matrix2D): Matrix2D;
        /**
         * Applies the current matrix to a set of 2 floats and stores the result in a vector2
         * @param x defines the x coordinate to transform
         * @param y defines the x coordinate to transform
         * @param result defines the target vector2
         * @returns the current matrix
         */
        transformCoordinates(x: number, y: number, result: Vector2): Matrix2D;
        /**
         * Creates an identity matrix
         * @returns a new matrix
         */
        static Identity(): Matrix2D;
        /**
         * Creates a translation matrix and stores it in a target matrix
         * @param x defines the x coordinate of the translation
         * @param y defines the y coordinate of the translation
         * @param result defines the target matrix
         */
        static TranslationToRef(x: number, y: number, result: Matrix2D): void;
        /**
         * Creates a scaling matrix and stores it in a target matrix
         * @param x defines the x coordinate of the scaling
         * @param y defines the y coordinate of the scaling
         * @param result defines the target matrix
         */
        static ScalingToRef(x: number, y: number, result: Matrix2D): void;
        /**
         * Creates a rotation matrix and stores it in a target matrix
         * @param angle defines the rotation angle
         * @param result defines the target matrix
         */
        static RotationToRef(angle: number, result: Matrix2D): void;
        private static _TempPreTranslationMatrix;
        private static _TempPostTranslationMatrix;
        private static _TempRotationMatrix;
        private static _TempScalingMatrix;
        private static _TempCompose0;
        private static _TempCompose1;
        private static _TempCompose2;
        /**
         * Composes a matrix from translation, rotation, scaling and parent matrix and stores it in a target matrix
         * @param tx defines the x coordinate of the translation
         * @param ty defines the y coordinate of the translation
         * @param angle defines the rotation angle
         * @param scaleX defines the x coordinate of the scaling
         * @param scaleY defines the y coordinate of the scaling
         * @param parentMatrix defines the parent matrix to multiply by (can be null)
         * @param result defines the target matrix
         */
        static ComposeToRef(tx: number, ty: number, angle: number, scaleX: number, scaleY: number, parentMatrix: Nullable<Matrix2D>, result: Matrix2D): void;
    }
}
declare module "babylonjs-gui/2D/measure" {
    import { Matrix2D } from "babylonjs-gui/2D/math2D";
    /**
     * Class used to store 2D control sizes
     */
    export class Measure {
        /** defines left coordinate */
        left: number;
        /** defines top coordinate  */
        top: number;
        /** defines width dimension  */
        width: number;
        /** defines height dimension */
        height: number;
        /**
         * Creates a new measure
         * @param left defines left coordinate
         * @param top defines top coordinate
         * @param width defines width dimension
         * @param height defines height dimension
         */
        constructor(
        /** defines left coordinate */
        left: number, 
        /** defines top coordinate  */
        top: number, 
        /** defines width dimension  */
        width: number, 
        /** defines height dimension */
        height: number);
        /**
         * Copy from another measure
         * @param other defines the other measure to copy from
         */
        copyFrom(other: Measure): void;
        /**
         * Copy from a group of 4 floats
         * @param left defines left coordinate
         * @param top defines top coordinate
         * @param width defines width dimension
         * @param height defines height dimension
         */
        copyFromFloats(left: number, top: number, width: number, height: number): void;
        /**
         * Computes the axis aligned bounding box measure for two given measures
         * @param a Input measure
         * @param b Input measure
         * @param result the resulting bounding measure
         */
        static CombineToRef(a: Measure, b: Measure, result: Measure): void;
        /**
         * Computes the axis aligned bounding box of the measure after it is modified by a given transform
         * @param transform the matrix to transform the measure before computing the AABB
         * @param addX number to add to left
         * @param addY number to add to top
         * @param addWidth number to add to width
         * @param addHeight number to add to height
         * @param result the resulting AABB
         */
        addAndTransformToRef(transform: Matrix2D, addX: number, addY: number, addWidth: number, addHeight: number, result: Measure): void;
        /**
         * Computes the axis aligned bounding box of the measure after it is modified by a given transform
         * @param transform the matrix to transform the measure before computing the AABB
         * @param result the resulting AABB
         */
        transformToRef(transform: Matrix2D, result: Measure): void;
        /**
     * Check equality between this measure and another one
     * @param other defines the other measures
     * @returns true if both measures are equals
     */
        isEqualsTo(other: Measure): boolean;
        /**
         * Creates an empty measure
         * @returns a new measure
         */
        static Empty(): Measure;
    }
}
declare module "babylonjs-gui/2D/advancedDynamicTexture" {
    import { Nullable } from "babylonjs/types";
    import { Observable } from "babylonjs/Misc/observable";
    import { Vector2, Vector3, Matrix } from "babylonjs/Maths/math.vector";
    import { ClipboardInfo } from "babylonjs/Events/clipboardEvents";
    import { DynamicTexture } from "babylonjs/Materials/Textures/dynamicTexture";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { Layer } from "babylonjs/Layers/layer";
    import { Scene } from "babylonjs/scene";
    import { Container } from "babylonjs-gui/2D/controls/container";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { IFocusableControl } from "babylonjs-gui/2D/controls/focusableControl";
    import { Style } from "babylonjs-gui/2D/style";
    import { Viewport } from 'babylonjs/Maths/math.viewport';
    /**
    * Class used to create texture to support 2D GUI elements
    * @see https://doc.babylonjs.com/how_to/gui
    */
    export class AdvancedDynamicTexture extends DynamicTexture {
        /** Define the Uurl to load snippets */
        static SnippetUrl: string;
        /** Snippet ID if the content was created from the snippet server */
        snippetId: string;
        private _isDirty;
        private _renderObserver;
        private _resizeObserver;
        private _preKeyboardObserver;
        private _pointerMoveObserver;
        private _pointerObserver;
        private _canvasPointerOutObserver;
        private _canvasBlurObserver;
        private _background;
        /** @hidden */
        _rootContainer: Container;
        /** @hidden */
        _lastPickedControl: Control;
        /** @hidden */
        _lastControlOver: {
            [pointerId: number]: Control;
        };
        /** @hidden */
        _lastControlDown: {
            [pointerId: number]: Control;
        };
        /** @hidden */
        _capturingControl: {
            [pointerId: number]: Control;
        };
        /** @hidden */
        _shouldBlockPointer: boolean;
        /** @hidden */
        _layerToDispose: Nullable<Layer>;
        /** @hidden */
        _linkedControls: Control[];
        private _isFullscreen;
        private _fullscreenViewport;
        private _idealWidth;
        private _idealHeight;
        private _useSmallestIdeal;
        private _renderAtIdealSize;
        private _focusedControl;
        private _blockNextFocusCheck;
        private _renderScale;
        private _rootElement;
        private _cursorChanged;
        private _defaultMousePointerId;
        /** @hidden */
        _numLayoutCalls: number;
        /** Gets the number of layout calls made the last time the ADT has been rendered */
        get numLayoutCalls(): number;
        /** @hidden */
        _numRenderCalls: number;
        /** Gets the number of render calls made the last time the ADT has been rendered */
        get numRenderCalls(): number;
        /**
        * Define type to string to ensure compatibility across browsers
        * Safari doesn't support DataTransfer constructor
        */
        private _clipboardData;
        /**
        * Observable event triggered each time an clipboard event is received from the rendering canvas
        */
        onClipboardObservable: Observable<ClipboardInfo>;
        /**
        * Observable event triggered each time a pointer down is intercepted by a control
        */
        onControlPickedObservable: Observable<Control>;
        /**
        * Observable event triggered before layout is evaluated
        */
        onBeginLayoutObservable: Observable<AdvancedDynamicTexture>;
        /**
        * Observable event triggered after the layout was evaluated
        */
        onEndLayoutObservable: Observable<AdvancedDynamicTexture>;
        /**
        * Observable event triggered before the texture is rendered
        */
        onBeginRenderObservable: Observable<AdvancedDynamicTexture>;
        /**
        * Observable event triggered after the texture was rendered
        */
        onEndRenderObservable: Observable<AdvancedDynamicTexture>;
        /**
        * Gets or sets a boolean defining if alpha is stored as premultiplied
        */
        premulAlpha: boolean;
        /**
         * Gets or sets a boolean indicating that the canvas must be reverted on Y when updating the texture
         */
        applyYInversionOnUpdate: boolean;
        /**
        * Gets or sets a number used to scale rendering size (2 means that the texture will be twice bigger).
        * Useful when you want more antialiasing
        */
        get renderScale(): number;
        set renderScale(value: number);
        /** Gets or sets the background color */
        get background(): string;
        set background(value: string);
        /**
        * Gets or sets the ideal width used to design controls.
        * The GUI will then rescale everything accordingly
        * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
        */
        get idealWidth(): number;
        set idealWidth(value: number);
        /**
        * Gets or sets the ideal height used to design controls.
        * The GUI will then rescale everything accordingly
        * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
        */
        get idealHeight(): number;
        set idealHeight(value: number);
        /**
        * Gets or sets a boolean indicating if the smallest ideal value must be used if idealWidth and idealHeight are both set
        * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
        */
        get useSmallestIdeal(): boolean;
        set useSmallestIdeal(value: boolean);
        /**
        * Gets or sets a boolean indicating if adaptive scaling must be used
        * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
        */
        get renderAtIdealSize(): boolean;
        set renderAtIdealSize(value: boolean);
        /**
         * Gets the ratio used when in "ideal mode"
        * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
         * */
        get idealRatio(): number;
        /**
        * Gets the underlying layer used to render the texture when in fullscreen mode
        */
        get layer(): Nullable<Layer>;
        /**
        * Gets the root container control
        */
        get rootContainer(): Container;
        /**
        * Returns an array containing the root container.
        * This is mostly used to let the Inspector introspects the ADT
        * @returns an array containing the rootContainer
        */
        getChildren(): Array<Container>;
        /**
        * Will return all controls that are inside this texture
        * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
        * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
        * @return all child controls
        */
        getDescendants(directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): Control[];
        /**
        * Gets or sets the current focused control
        */
        get focusedControl(): Nullable<IFocusableControl>;
        set focusedControl(control: Nullable<IFocusableControl>);
        /**
        * Gets or sets a boolean indicating if the texture must be rendered in background or foreground when in fullscreen mode
        */
        get isForeground(): boolean;
        set isForeground(value: boolean);
        /**
        * Gets or set information about clipboardData
        */
        get clipboardData(): string;
        set clipboardData(value: string);
        /**
       * Creates a new AdvancedDynamicTexture
       * @param name defines the name of the texture
       * @param width defines the width of the texture
       * @param height defines the height of the texture
       * @param scene defines the hosting scene
       * @param generateMipMaps defines a boolean indicating if mipmaps must be generated (false by default)
       * @param samplingMode defines the texture sampling mode (Texture.NEAREST_SAMPLINGMODE by default)
       * @param invertY defines if the texture needs to be inverted on the y axis during loading (true by default)
       */
        constructor(name: string, width: number | undefined, height: number | undefined, scene: Nullable<Scene>, generateMipMaps?: boolean, samplingMode?: number, invertY?: boolean);
        /**
        * Get the current class name of the texture useful for serialization or dynamic coding.
        * @returns "AdvancedDynamicTexture"
        */
        getClassName(): string;
        /**
        * Function used to execute a function on all controls
        * @param func defines the function to execute
        * @param container defines the container where controls belong. If null the root container will be used
        */
        executeOnAllControls(func: (control: Control) => void, container?: Container): void;
        private _useInvalidateRectOptimization;
        /**
         * Gets or sets a boolean indicating if the InvalidateRect optimization should be turned on
         */
        get useInvalidateRectOptimization(): boolean;
        set useInvalidateRectOptimization(value: boolean);
        private _invalidatedRectangle;
        /**
         * Invalidates a rectangle area on the gui texture
         * @param invalidMinX left most position of the rectangle to invalidate in the texture
         * @param invalidMinY top most position of the rectangle to invalidate in the texture
         * @param invalidMaxX right most position of the rectangle to invalidate in the texture
         * @param invalidMaxY bottom most position of the rectangle to invalidate in the texture
         */
        invalidateRect(invalidMinX: number, invalidMinY: number, invalidMaxX: number, invalidMaxY: number): void;
        /**
        * Marks the texture as dirty forcing a complete update
        */
        markAsDirty(): void;
        /**
        * Helper function used to create a new style
        * @returns a new style
        * @see https://doc.babylonjs.com/how_to/gui#styles
        */
        createStyle(): Style;
        /**
        * Adds a new control to the root container
        * @param control defines the control to add
        * @returns the current texture
        */
        addControl(control: Control): AdvancedDynamicTexture;
        /**
        * Removes a control from the root container
        * @param control defines the control to remove
        * @returns the current texture
        */
        removeControl(control: Control): AdvancedDynamicTexture;
        /**
        * Release all resources
        */
        dispose(): void;
        private _onResize;
        /** @hidden */
        _getGlobalViewport(): Viewport;
        /**
        * Get screen coordinates for a vector3
        * @param position defines the position to project
        * @param worldMatrix defines the world matrix to use
        * @returns the projected position
        */
        getProjectedPosition(position: Vector3, worldMatrix: Matrix): Vector2;
        /**
        * Get screen coordinates for a vector3
        * @param position defines the position to project
        * @param worldMatrix defines the world matrix to use
        * @returns the projected position with Z
        */
        getProjectedPositionWithZ(position: Vector3, worldMatrix: Matrix): Vector3;
        private _checkUpdate;
        private _clearMeasure;
        private _render;
        /** @hidden */
        _changeCursor(cursor: string): void;
        /** @hidden */
        _registerLastControlDown(control: Control, pointerId: number): void;
        private _doPicking;
        /** @hidden */
        _cleanControlAfterRemovalFromList(list: {
            [pointerId: number]: Control;
        }, control: Control): void;
        /** @hidden */
        _cleanControlAfterRemoval(control: Control): void;
        /** Attach to all scene events required to support pointer events */
        attach(): void;
        /** @hidden */
        private onClipboardCopy;
        /** @hidden */
        private onClipboardCut;
        /** @hidden */
        private onClipboardPaste;
        /**
        * Register the clipboard Events onto the canvas
        */
        registerClipboardEvents(): void;
        /**
         * Unregister the clipboard Events from the canvas
         */
        unRegisterClipboardEvents(): void;
        /**
        * Connect the texture to a hosting mesh to enable interactions
        * @param mesh defines the mesh to attach to
        * @param supportPointerMove defines a boolean indicating if pointer move events must be catched as well
        */
        attachToMesh(mesh: AbstractMesh, supportPointerMove?: boolean): void;
        /**
        * Move the focus to a specific control
        * @param control defines the control which will receive the focus
        */
        moveFocusToControl(control: IFocusableControl): void;
        private _manageFocus;
        private _attachToOnPointerOut;
        private _attachToOnBlur;
        /**
         * Serializes the entire GUI system
         * @returns an object with the JSON serialized data
         */
        serializeContent(): any;
        /**
         * Recreate the content of the ADT from a JSON object
         * @param serializedObject define the JSON serialized object to restore from
         */
        parseContent(serializedObject: any): void;
        /**
         * Recreate the content of the ADT from a snippet saved by the GUI editor
         * @param snippetId defines the snippet to load
         * @returns a promise that will resolve on success
         */
        parseFromSnippetAsync(snippetId: string): Promise<void>;
        /**
         * Creates a new AdvancedDynamicTexture in projected mode (ie. attached to a mesh)
         * @param mesh defines the mesh which will receive the texture
         * @param width defines the texture width (1024 by default)
         * @param height defines the texture height (1024 by default)
         * @param supportPointerMove defines a boolean indicating if the texture must capture move events (true by default)
         * @param onlyAlphaTesting defines a boolean indicating that alpha blending will not be used (only alpha testing) (false by default)
         * @param invertY defines if the texture needs to be inverted on the y axis during loading (true by default)
         * @returns a new AdvancedDynamicTexture
         */
        static CreateForMesh(mesh: AbstractMesh, width?: number, height?: number, supportPointerMove?: boolean, onlyAlphaTesting?: boolean, invertY?: boolean): AdvancedDynamicTexture;
        /**
         * Creates a new AdvancedDynamicTexture in projected mode (ie. attached to a mesh) BUT do not create a new material for the mesh. You will be responsible for connecting the texture
         * @param mesh defines the mesh which will receive the texture
         * @param width defines the texture width (1024 by default)
         * @param height defines the texture height (1024 by default)
         * @param supportPointerMove defines a boolean indicating if the texture must capture move events (true by default)
         * @param invertY defines if the texture needs to be inverted on the y axis during loading (true by default)
         * @returns a new AdvancedDynamicTexture
         */
        static CreateForMeshTexture(mesh: AbstractMesh, width?: number, height?: number, supportPointerMove?: boolean, invertY?: boolean): AdvancedDynamicTexture;
        /**
        * Creates a new AdvancedDynamicTexture in fullscreen mode.
        * In this mode the texture will rely on a layer for its rendering.
        * This allows it to be treated like any other layer.
        * As such, if you have a multi camera setup, you can set the layerMask on the GUI as well.
        * LayerMask is set through advancedTexture.layer.layerMask
        * @param name defines name for the texture
        * @param foreground defines a boolean indicating if the texture must be rendered in foreground (default is true)
        * @param scene defines the hsoting scene
        * @param sampling defines the texture sampling mode (Texture.BILINEAR_SAMPLINGMODE by default)
        * @returns a new AdvancedDynamicTexture
        */
        static CreateFullscreenUI(name: string, foreground?: boolean, scene?: Nullable<Scene>, sampling?: number): AdvancedDynamicTexture;
    }
}
declare module "babylonjs-gui/2D/controls/control" {
    import { Nullable } from "babylonjs/types";
    import { Observable } from "babylonjs/Misc/observable";
    import { Vector2, Vector3 } from "babylonjs/Maths/math.vector";
    import { PointerInfoBase } from 'babylonjs/Events/pointerEvents';
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { Scene } from "babylonjs/scene";
    import { Container } from "babylonjs-gui/2D/controls/container";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    import { ValueAndUnit } from "babylonjs-gui/2D/valueAndUnit";
    import { Measure } from "babylonjs-gui/2D/measure";
    import { Style } from "babylonjs-gui/2D/style";
    import { Matrix2D, Vector2WithInfo } from "babylonjs-gui/2D/math2D";
    /**
     * Root class used for all 2D controls
     * @see https://doc.babylonjs.com/how_to/gui#controls
     */
    export class Control {
        /** defines the name of the control */
        name?: string | undefined;
        /**
         * Gets or sets a boolean indicating if alpha must be an inherited value (false by default)
         */
        static AllowAlphaInheritance: boolean;
        private _alpha;
        private _alphaSet;
        private _zIndex;
        /** @hidden */
        _host: AdvancedDynamicTexture;
        /** Gets or sets the control parent */
        parent: Nullable<Container>;
        /** @hidden */
        _currentMeasure: Measure;
        private _fontFamily;
        private _fontStyle;
        private _fontWeight;
        private _fontSize;
        private _font;
        /** @hidden */
        _width: ValueAndUnit;
        /** @hidden */
        _height: ValueAndUnit;
        /** @hidden */
        protected _fontOffset: {
            ascent: number;
            height: number;
            descent: number;
        };
        private _color;
        private _style;
        private _styleObserver;
        /** @hidden */
        protected _horizontalAlignment: number;
        /** @hidden */
        protected _verticalAlignment: number;
        /** @hidden */
        protected _isDirty: boolean;
        /** @hidden */
        protected _wasDirty: boolean;
        /** @hidden */
        _tempParentMeasure: Measure;
        /** @hidden */
        _prevCurrentMeasureTransformedIntoGlobalSpace: Measure;
        /** @hidden */
        protected _cachedParentMeasure: Measure;
        private _paddingLeft;
        private _paddingRight;
        private _paddingTop;
        private _paddingBottom;
        /** @hidden */
        _left: ValueAndUnit;
        /** @hidden */
        _top: ValueAndUnit;
        private _scaleX;
        private _scaleY;
        private _rotation;
        private _transformCenterX;
        private _transformCenterY;
        /** @hidden */
        _transformMatrix: Matrix2D;
        /** @hidden */
        protected _invertTransformMatrix: Matrix2D;
        /** @hidden */
        protected _transformedPosition: Vector2;
        private _isMatrixDirty;
        private _cachedOffsetX;
        private _cachedOffsetY;
        private _isVisible;
        private _isHighlighted;
        private _highlightLineWidth;
        /** @hidden */
        _linkedMesh: Nullable<TransformNode>;
        private _fontSet;
        private _dummyVector2;
        private _downCount;
        private _enterCount;
        private _doNotRender;
        private _downPointerIds;
        protected _isEnabled: boolean;
        protected _disabledColor: string;
        protected _disabledColorItem: string;
        /** @hidden */
        protected _rebuildLayout: boolean;
        /** @hidden */
        _customData: any;
        /** @hidden */
        _isClipped: boolean;
        /** @hidden */
        _automaticSize: boolean;
        /** @hidden */
        _tag: any;
        /**
         * Gets or sets the unique id of the node. Please note that this number will be updated when the control is added to a container
         */
        uniqueId: number;
        /**
         * Gets or sets an object used to store user defined information for the node
         */
        metadata: any;
        /** Gets or sets a boolean indicating if the control can be hit with pointer events */
        isHitTestVisible: boolean;
        /** Gets or sets a boolean indicating if the control can block pointer events */
        isPointerBlocker: boolean;
        /** Gets or sets a boolean indicating if the control can be focusable */
        isFocusInvisible: boolean;
        /**
         * Gets or sets a boolean indicating if the children are clipped to the current control bounds.
         * Please note that not clipping children may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
         */
        clipChildren: boolean;
        /**
         * Gets or sets a boolean indicating that control content must be clipped
         * Please note that not clipping children may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
         */
        clipContent: boolean;
        /**
         * Gets or sets a boolean indicating that the current control should cache its rendering (useful when the control does not change often)
         */
        useBitmapCache: boolean;
        private _cacheData;
        private _shadowOffsetX;
        /** Gets or sets a value indicating the offset to apply on X axis to render the shadow */
        get shadowOffsetX(): number;
        set shadowOffsetX(value: number);
        private _shadowOffsetY;
        /** Gets or sets a value indicating the offset to apply on Y axis to render the shadow */
        get shadowOffsetY(): number;
        set shadowOffsetY(value: number);
        private _shadowBlur;
        private _previousShadowBlur;
        /** Gets or sets a value indicating the amount of blur to use to render the shadow */
        get shadowBlur(): number;
        set shadowBlur(value: number);
        private _shadowColor;
        /** Gets or sets a value indicating the color of the shadow (black by default ie. "#000") */
        get shadowColor(): string;
        set shadowColor(value: string);
        /** Gets or sets the cursor to use when the control is hovered */
        hoverCursor: string;
        /** @hidden */
        protected _linkOffsetX: ValueAndUnit;
        /** @hidden */
        protected _linkOffsetY: ValueAndUnit;
        /** Gets the control type name */
        get typeName(): string;
        /**
         * Get the current class name of the control.
         * @returns current class name
         */
        getClassName(): string;
        /**
        * An event triggered when pointer wheel is scrolled
        */
        onWheelObservable: Observable<Vector2>;
        /**
        * An event triggered when the pointer move over the control.
        */
        onPointerMoveObservable: Observable<Vector2>;
        /**
        * An event triggered when the pointer move out of the control.
        */
        onPointerOutObservable: Observable<Control>;
        /**
        * An event triggered when the pointer taps the control
        */
        onPointerDownObservable: Observable<Vector2WithInfo>;
        /**
        * An event triggered when pointer up
        */
        onPointerUpObservable: Observable<Vector2WithInfo>;
        /**
        * An event triggered when a control is clicked on
        */
        onPointerClickObservable: Observable<Vector2WithInfo>;
        /**
        * An event triggered when pointer enters the control
        */
        onPointerEnterObservable: Observable<Control>;
        /**
        * An event triggered when the control is marked as dirty
        */
        onDirtyObservable: Observable<Control>;
        /**
         * An event triggered before drawing the control
         */
        onBeforeDrawObservable: Observable<Control>;
        /**
         * An event triggered after the control was drawn
         */
        onAfterDrawObservable: Observable<Control>;
        /**
        * An event triggered when the control has been disposed
        */
        onDisposeObservable: Observable<Control>;
        /**
         * Get the hosting AdvancedDynamicTexture
         */
        get host(): AdvancedDynamicTexture;
        /** Gets or set information about font offsets (used to render and align text) */
        get fontOffset(): {
            ascent: number;
            height: number;
            descent: number;
        };
        set fontOffset(offset: {
            ascent: number;
            height: number;
            descent: number;
        });
        /** Gets or sets alpha value for the control (1 means opaque and 0 means entirely transparent) */
        get alpha(): number;
        set alpha(value: number);
        /**
         * Gets or sets a number indicating size of stroke we want to highlight the control with (mostly for debugging purpose)
         */
        get highlightLineWidth(): number;
        set highlightLineWidth(value: number);
        /**
         * Gets or sets a boolean indicating that we want to highlight the control (mostly for debugging purpose)
         */
        get isHighlighted(): boolean;
        set isHighlighted(value: boolean);
        /** Gets or sets a value indicating the scale factor on X axis (1 by default)
         * @see https://doc.babylonjs.com/how_to/gui#rotation-and-scaling
        */
        get scaleX(): number;
        set scaleX(value: number);
        /** Gets or sets a value indicating the scale factor on Y axis (1 by default)
         * @see https://doc.babylonjs.com/how_to/gui#rotation-and-scaling
        */
        get scaleY(): number;
        set scaleY(value: number);
        /** Gets or sets the rotation angle (0 by default)
         * @see https://doc.babylonjs.com/how_to/gui#rotation-and-scaling
        */
        get rotation(): number;
        set rotation(value: number);
        /** Gets or sets the transformation center on Y axis (0 by default)
         * @see https://doc.babylonjs.com/how_to/gui#rotation-and-scaling
        */
        get transformCenterY(): number;
        set transformCenterY(value: number);
        /** Gets or sets the transformation center on X axis (0 by default)
         * @see https://doc.babylonjs.com/how_to/gui#rotation-and-scaling
        */
        get transformCenterX(): number;
        set transformCenterX(value: number);
        /**
         * Gets or sets the horizontal alignment
         * @see https://doc.babylonjs.com/how_to/gui#alignments
         */
        get horizontalAlignment(): number;
        set horizontalAlignment(value: number);
        /**
         * Gets or sets the vertical alignment
         * @see https://doc.babylonjs.com/how_to/gui#alignments
         */
        get verticalAlignment(): number;
        set verticalAlignment(value: number);
        /**
         * Gets or sets a fixed ratio for this control.
         * When different from 0, the ratio is used to compute the "second" dimension.
         * The first dimension used in the computation is the last one set (by setting width / widthInPixels or height / heightInPixels), and the
         * second dimension is computed as first dimension * fixedRatio
         */
        fixedRatio: number;
        private _fixedRatioMasterIsWidth;
        /**
         * Gets or sets control width
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get width(): string | number;
        set width(value: string | number);
        /**
         * Gets or sets the control width in pixel
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get widthInPixels(): number;
        set widthInPixels(value: number);
        /**
         * Gets or sets control height
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get height(): string | number;
        set height(value: string | number);
        /**
         * Gets or sets control height in pixel
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get heightInPixels(): number;
        set heightInPixels(value: number);
        /** Gets or set font family */
        get fontFamily(): string;
        set fontFamily(value: string);
        /** Gets or sets font style */
        get fontStyle(): string;
        set fontStyle(value: string);
        /** Gets or sets font weight */
        get fontWeight(): string;
        set fontWeight(value: string);
        /**
         * Gets or sets style
         * @see https://doc.babylonjs.com/how_to/gui#styles
         */
        get style(): Nullable<Style>;
        set style(value: Nullable<Style>);
        /** @hidden */
        get _isFontSizeInPercentage(): boolean;
        /** Gets or sets font size in pixels */
        get fontSizeInPixels(): number;
        set fontSizeInPixels(value: number);
        /** Gets or sets font size */
        get fontSize(): string | number;
        set fontSize(value: string | number);
        /** Gets or sets foreground color */
        get color(): string;
        set color(value: string);
        /** Gets or sets z index which is used to reorder controls on the z axis */
        get zIndex(): number;
        set zIndex(value: number);
        /** Gets or sets a boolean indicating if the control can be rendered */
        get notRenderable(): boolean;
        set notRenderable(value: boolean);
        /** Gets or sets a boolean indicating if the control is visible */
        get isVisible(): boolean;
        set isVisible(value: boolean);
        /** Gets a boolean indicating that the control needs to update its rendering */
        get isDirty(): boolean;
        /**
         * Gets the current linked mesh (or null if none)
         */
        get linkedMesh(): Nullable<TransformNode>;
        /**
         * Gets or sets a value indicating the padding to use on the left of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingLeft(): string | number;
        set paddingLeft(value: string | number);
        /**
         * Gets or sets a value indicating the padding in pixels to use on the left of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingLeftInPixels(): number;
        set paddingLeftInPixels(value: number);
        /**
         * Gets or sets a value indicating the padding to use on the right of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingRight(): string | number;
        set paddingRight(value: string | number);
        /**
         * Gets or sets a value indicating the padding in pixels to use on the right of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingRightInPixels(): number;
        set paddingRightInPixels(value: number);
        /**
         * Gets or sets a value indicating the padding to use on the top of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingTop(): string | number;
        set paddingTop(value: string | number);
        /**
         * Gets or sets a value indicating the padding in pixels to use on the top of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingTopInPixels(): number;
        set paddingTopInPixels(value: number);
        /**
         * Gets or sets a value indicating the padding to use on the bottom of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingBottom(): string | number;
        set paddingBottom(value: string | number);
        /**
         * Gets or sets a value indicating the padding in pixels to use on the bottom of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingBottomInPixels(): number;
        set paddingBottomInPixels(value: number);
        /**
         * Gets or sets a value indicating the left coordinate of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get left(): string | number;
        set left(value: string | number);
        /**
         * Gets or sets a value indicating the left coordinate in pixels of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get leftInPixels(): number;
        set leftInPixels(value: number);
        /**
         * Gets or sets a value indicating the top coordinate of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get top(): string | number;
        set top(value: string | number);
        /**
         * Gets or sets a value indicating the top coordinate in pixels of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get topInPixels(): number;
        set topInPixels(value: number);
        /**
         * Gets or sets a value indicating the offset on X axis to the linked mesh
         * @see https://doc.babylonjs.com/how_to/gui#tracking-positions
         */
        get linkOffsetX(): string | number;
        set linkOffsetX(value: string | number);
        /**
         * Gets or sets a value indicating the offset in pixels on X axis to the linked mesh
         * @see https://doc.babylonjs.com/how_to/gui#tracking-positions
         */
        get linkOffsetXInPixels(): number;
        set linkOffsetXInPixels(value: number);
        /**
         * Gets or sets a value indicating the offset on Y axis to the linked mesh
         * @see https://doc.babylonjs.com/how_to/gui#tracking-positions
         */
        get linkOffsetY(): string | number;
        set linkOffsetY(value: string | number);
        /**
         * Gets or sets a value indicating the offset in pixels on Y axis to the linked mesh
         * @see https://doc.babylonjs.com/how_to/gui#tracking-positions
         */
        get linkOffsetYInPixels(): number;
        set linkOffsetYInPixels(value: number);
        /** Gets the center coordinate on X axis */
        get centerX(): number;
        /** Gets the center coordinate on Y axis */
        get centerY(): number;
        /** Gets or sets if control is Enabled */
        get isEnabled(): boolean;
        set isEnabled(value: boolean);
        /** Gets or sets background color of control if it's disabled */
        get disabledColor(): string;
        set disabledColor(value: string);
        /** Gets or sets front color of control if it's disabled */
        get disabledColorItem(): string;
        set disabledColorItem(value: string);
        /**
         * Creates a new control
         * @param name defines the name of the control
         */
        constructor(
        /** defines the name of the control */
        name?: string | undefined);
        /** @hidden */
        protected _getTypeName(): string;
        /**
         * Gets the first ascendant in the hierarchy of the given type
         * @param className defines the required type
         * @returns the ascendant or null if not found
         */
        getAscendantOfClass(className: string): Nullable<Control>;
        /** @hidden */
        _resetFontCache(): void;
        /**
         * Determines if a container is an ascendant of the current control
         * @param container defines the container to look for
         * @returns true if the container is one of the ascendant of the control
         */
        isAscendant(container: Control): boolean;
        /**
         * Gets coordinates in local control space
         * @param globalCoordinates defines the coordinates to transform
         * @returns the new coordinates in local space
         */
        getLocalCoordinates(globalCoordinates: Vector2): Vector2;
        /**
         * Gets coordinates in local control space
         * @param globalCoordinates defines the coordinates to transform
         * @param result defines the target vector2 where to store the result
         * @returns the current control
         */
        getLocalCoordinatesToRef(globalCoordinates: Vector2, result: Vector2): Control;
        /**
         * Gets coordinates in parent local control space
         * @param globalCoordinates defines the coordinates to transform
         * @returns the new coordinates in parent local space
         */
        getParentLocalCoordinates(globalCoordinates: Vector2): Vector2;
        /**
         * Move the current control to a vector3 position projected onto the screen.
         * @param position defines the target position
         * @param scene defines the hosting scene
         */
        moveToVector3(position: Vector3, scene: Scene): void;
        /**
         * Will store all controls that have this control as ascendant in a given array
         * @param results defines the array where to store the descendants
         * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
         * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
         */
        getDescendantsToRef(results: Control[], directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): void;
        /**
         * Will return all controls that have this control as ascendant
         * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
         * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
         * @return all child controls
         */
        getDescendants(directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): Control[];
        /**
         * Link current control with a target mesh
         * @param mesh defines the mesh to link with
         * @see https://doc.babylonjs.com/how_to/gui#tracking-positions
         */
        linkWithMesh(mesh: Nullable<TransformNode>): void;
        /**
        * Shorthand funtion to set the top, right, bottom, and left padding values on the control.
        * @param { string | number} paddingTop - The value of the top padding.
        * @param { string | number} paddingRight - The value of the right padding. If omitted, top is used.
        * @param { string | number} paddingBottom - The value of the bottom padding. If omitted, top is used.
        * @param { string | number} paddingLeft - The value of the left padding. If omitted, right is used.
        * @see https://doc.babylonjs.com/how_to/gui#position-and-size
        */
        setPadding(paddingTop: string | number, paddingRight?: string | number, paddingBottom?: string | number, paddingLeft?: string | number): void;
        /**
         * Shorthand funtion to set the top, right, bottom, and left padding values in pixels on the control.
         * @param { number} paddingTop - The value in pixels of the top padding.
         * @param { number} paddingRight - The value in pixels of the right padding. If omitted, top is used.
         * @param { number} paddingBottom - The value in pixels of the bottom padding. If omitted, top is used.
         * @param { number} paddingLeft - The value in pixels of the left padding. If omitted, right is used.
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        setPaddingInPixels(paddingTop: number, paddingRight?: number, paddingBottom?: number, paddingLeft?: number): void;
        /** @hidden */
        _moveToProjectedPosition(projectedPosition: Vector3): void;
        /** @hidden */
        _offsetLeft(offset: number): void;
        /** @hidden */
        _offsetTop(offset: number): void;
        /** @hidden */
        _markMatrixAsDirty(): void;
        /** @hidden */
        _flagDescendantsAsMatrixDirty(): void;
        /** @hidden */
        _intersectsRect(rect: Measure): boolean;
        /** @hidden */
        protected invalidateRect(): void;
        /** @hidden */
        _markAsDirty(force?: boolean): void;
        /** @hidden */
        _markAllAsDirty(): void;
        /** @hidden */
        _link(host: AdvancedDynamicTexture): void;
        /** @hidden */
        protected _transform(context?: CanvasRenderingContext2D): void;
        /** @hidden */
        _renderHighlight(context: CanvasRenderingContext2D): void;
        /** @hidden */
        _renderHighlightSpecific(context: CanvasRenderingContext2D): void;
        /** @hidden */
        protected _applyStates(context: CanvasRenderingContext2D): void;
        /** @hidden */
        _layout(parentMeasure: Measure, context: CanvasRenderingContext2D): boolean;
        /** @hidden */
        protected _processMeasures(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        protected _evaluateClippingState(parentMeasure: Measure): void;
        /** @hidden */
        _measure(): void;
        /** @hidden */
        protected _computeAlignment(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /** @hidden */
        protected _preMeasure(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /** @hidden */
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /** @hidden */
        protected _clipForChildren(context: CanvasRenderingContext2D): void;
        private static _ClipMeasure;
        private _tmpMeasureA;
        private _clip;
        /** @hidden */
        _render(context: CanvasRenderingContext2D, invalidatedRectangle?: Nullable<Measure>): boolean;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Nullable<Measure>): void;
        /**
         * Tests if a given coordinates belong to the current control
         * @param x defines x coordinate to test
         * @param y defines y coordinate to test
         * @returns true if the coordinates are inside the control
         */
        contains(x: number, y: number): boolean;
        /** @hidden */
        _processPicking(x: number, y: number, pi: PointerInfoBase, type: number, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
        /** @hidden */
        _onPointerMove(target: Control, coordinates: Vector2, pointerId: number, pi: PointerInfoBase): void;
        /** @hidden */
        _onPointerEnter(target: Control, pi: PointerInfoBase): boolean;
        /** @hidden */
        _onPointerOut(target: Control, pi: Nullable<PointerInfoBase>, force?: boolean): void;
        /** @hidden */
        _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
        /** @hidden */
        _onPointerUp(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi?: PointerInfoBase): void;
        /** @hidden */
        _forcePointerUp(pointerId?: Nullable<number>): void;
        /** @hidden */
        _onWheelScroll(deltaX?: number, deltaY?: number): void;
        /** @hidden */
        _onCanvasBlur(): void;
        /** @hidden */
        _processObservables(type: number, x: number, y: number, pi: PointerInfoBase, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
        private _prepareFont;
        /**
         * Serializes the current control
         * @param serializationObject defined the JSON serialized object
         */
        serialize(serializationObject: any): void;
        /** @hidden */
        _parseFromContent(serializedObject: any, host: AdvancedDynamicTexture): void;
        /** Releases associated resources */
        dispose(): void;
        private static _HORIZONTAL_ALIGNMENT_LEFT;
        private static _HORIZONTAL_ALIGNMENT_RIGHT;
        private static _HORIZONTAL_ALIGNMENT_CENTER;
        private static _VERTICAL_ALIGNMENT_TOP;
        private static _VERTICAL_ALIGNMENT_BOTTOM;
        private static _VERTICAL_ALIGNMENT_CENTER;
        /** HORIZONTAL_ALIGNMENT_LEFT */
        static get HORIZONTAL_ALIGNMENT_LEFT(): number;
        /** HORIZONTAL_ALIGNMENT_RIGHT */
        static get HORIZONTAL_ALIGNMENT_RIGHT(): number;
        /** HORIZONTAL_ALIGNMENT_CENTER */
        static get HORIZONTAL_ALIGNMENT_CENTER(): number;
        /** VERTICAL_ALIGNMENT_TOP */
        static get VERTICAL_ALIGNMENT_TOP(): number;
        /** VERTICAL_ALIGNMENT_BOTTOM */
        static get VERTICAL_ALIGNMENT_BOTTOM(): number;
        /** VERTICAL_ALIGNMENT_CENTER */
        static get VERTICAL_ALIGNMENT_CENTER(): number;
        private static _FontHeightSizes;
        /** @hidden */
        static _GetFontOffset(font: string): {
            ascent: number;
            height: number;
            descent: number;
        };
        /**
         * Creates a Control from parsed data
         * @param serializedObject defines parsed data
         * @param host defines the hosting AdvancedDynamicTexture
         * @returns a new Control
         */
        static Parse(serializedObject: any, host: AdvancedDynamicTexture): Control;
        /**
         * Creates a stack panel that can be used to render headers
         * @param control defines the control to associate with the header
         * @param text defines the text of the header
         * @param size defines the size of the header
         * @param options defines options used to configure the header
         * @returns a new StackPanel
         * @ignore
         * @hidden
         */
        static AddHeader: (control: Control, text: string, size: string | number, options: {
            isHorizontal: boolean;
            controlFirst: boolean;
        }) => any;
        /** @hidden */
        protected static drawEllipse(x: number, y: number, width: number, height: number, context: CanvasRenderingContext2D): void;
    }
}
declare module "babylonjs-gui/2D/controls/container" {
    import { Nullable } from "babylonjs/types";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { Measure } from "babylonjs-gui/2D/measure";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    import { PointerInfoBase } from 'babylonjs/Events/pointerEvents';
    import { DynamicTexture } from "babylonjs/Materials/Textures/dynamicTexture";
    /**
     * Root class for 2D containers
     * @see https://doc.babylonjs.com/how_to/gui#containers
     */
    export class Container extends Control {
        name?: string | undefined;
        /** @hidden */
        _children: Control[];
        /** @hidden */
        protected _measureForChildren: Measure;
        /** @hidden */
        protected _background: string;
        /** @hidden */
        protected _adaptWidthToChildren: boolean;
        /** @hidden */
        protected _adaptHeightToChildren: boolean;
        /** @hidden */
        protected _renderToIntermediateTexture: boolean;
        /** @hidden */
        protected _intermediateTexture: Nullable<DynamicTexture>;
        /** Gets or sets boolean indicating if children should be rendered to an intermediate texture rather than directly to host, useful for alpha blending */
        get renderToIntermediateTexture(): boolean;
        set renderToIntermediateTexture(value: boolean);
        /**
         * Gets or sets a boolean indicating that layout cycle errors should be displayed on the console
         */
        logLayoutCycleErrors: boolean;
        /**
         * Gets or sets the number of layout cycles (a change involved by a control while evaluating the layout) allowed
         */
        maxLayoutCycle: number;
        /** Gets or sets a boolean indicating if the container should try to adapt to its children height */
        get adaptHeightToChildren(): boolean;
        set adaptHeightToChildren(value: boolean);
        /** Gets or sets a boolean indicating if the container should try to adapt to its children width */
        get adaptWidthToChildren(): boolean;
        set adaptWidthToChildren(value: boolean);
        /** Gets or sets background color */
        get background(): string;
        set background(value: string);
        /** Gets the list of children */
        get children(): Control[];
        /**
         * Creates a new Container
         * @param name defines the name of the container
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        _flagDescendantsAsMatrixDirty(): void;
        /**
         * Gets a child using its name
         * @param name defines the child name to look for
         * @returns the child control if found
         */
        getChildByName(name: string): Nullable<Control>;
        /**
         * Gets a child using its type and its name
         * @param name defines the child name to look for
         * @param type defines the child type to look for
         * @returns the child control if found
         */
        getChildByType(name: string, type: string): Nullable<Control>;
        /**
         * Search for a specific control in children
         * @param control defines the control to look for
         * @returns true if the control is in child list
         */
        containsControl(control: Control): boolean;
        /**
         * Adds a new control to the current container
         * @param control defines the control to add
         * @returns the current container
         */
        addControl(control: Nullable<Control>): Container;
        /**
         * Removes all controls from the current container
         * @returns the current container
         */
        clearControls(): Container;
        /**
         * Removes a control from the current container
         * @param control defines the control to remove
         * @returns the current container
         */
        removeControl(control: Control): Container;
        /** @hidden */
        _reOrderControl(control: Control): void;
        /** @hidden */
        _offsetLeft(offset: number): void;
        /** @hidden */
        _offsetTop(offset: number): void;
        /** @hidden */
        _markAllAsDirty(): void;
        /** @hidden */
        protected _localDraw(context: CanvasRenderingContext2D): void;
        /** @hidden */
        _link(host: AdvancedDynamicTexture): void;
        /** @hidden */
        protected _beforeLayout(): void;
        /** @hidden */
        protected _processMeasures(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /** @hidden */
        _layout(parentMeasure: Measure, context: CanvasRenderingContext2D): boolean;
        protected _postMeasure(): void;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Measure): void;
        getDescendantsToRef(results: Control[], directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): void;
        /** @hidden */
        _processPicking(x: number, y: number, pi: PointerInfoBase, type: number, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
        /** @hidden */
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /**
        * Serializes the current control
        * @param serializationObject defined the JSON serialized object
        */
        serialize(serializationObject: any): void;
        /** Releases associated resources */
        dispose(): void;
        /** @hidden */
        _parseFromContent(serializedObject: any, host: AdvancedDynamicTexture): void;
    }
}
declare module "babylonjs-gui/2D/controls/rectangle" {
    import { Container } from "babylonjs-gui/2D/controls/container";
    import { Measure } from "babylonjs-gui/2D/measure";
    /** Class used to create rectangle container */
    export class Rectangle extends Container {
        name?: string | undefined;
        private _thickness;
        private _cornerRadius;
        /** Gets or sets border thickness */
        get thickness(): number;
        set thickness(value: number);
        /** Gets or sets the corner radius angle */
        get cornerRadius(): number;
        set cornerRadius(value: number);
        /**
         * Creates a new Rectangle
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _localDraw(context: CanvasRenderingContext2D): void;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        private _drawRoundedRect;
        protected _clipForChildren(context: CanvasRenderingContext2D): void;
    }
}
declare module "babylonjs-gui/2D/controls/textBlock" {
    import { Observable } from "babylonjs/Misc/observable";
    import { Measure } from "babylonjs-gui/2D/measure";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { Nullable } from "babylonjs/types";
    /**
     * Enum that determines the text-wrapping mode to use.
     */
    export enum TextWrapping {
        /**
         * Clip the text when it's larger than Control.width; this is the default mode.
         */
        Clip = 0,
        /**
         * Wrap the text word-wise, i.e. try to add line-breaks at word boundary to fit within Control.width.
         */
        WordWrap = 1,
        /**
         * Ellipsize the text, i.e. shrink with trailing … when text is larger than Control.width.
         */
        Ellipsis = 2
    }
    /**
     * Class used to create text block control
     */
    export class TextBlock extends Control {
        /**
         * Defines the name of the control
         */
        name?: string | undefined;
        private _text;
        private _textWrapping;
        private _textHorizontalAlignment;
        private _textVerticalAlignment;
        private _lines;
        private _resizeToFit;
        private _lineSpacing;
        private _outlineWidth;
        private _outlineColor;
        private _underline;
        private _lineThrough;
        /**
         * An event triggered after the text is changed
         */
        onTextChangedObservable: Observable<TextBlock>;
        /**
         * An event triggered after the text was broken up into lines
         */
        onLinesReadyObservable: Observable<TextBlock>;
        /**
         * Function used to split a string into words. By default, a string is split at each space character found
         */
        wordSplittingFunction: Nullable<(line: string) => string[]>;
        /**
         * Return the line list (you may need to use the onLinesReadyObservable to make sure the list is ready)
         */
        get lines(): any[];
        /**
         * Gets or sets an boolean indicating that the TextBlock will be resized to fit container
         */
        get resizeToFit(): boolean;
        /**
         * Gets or sets an boolean indicating that the TextBlock will be resized to fit container
         */
        set resizeToFit(value: boolean);
        /**
         * Gets or sets a boolean indicating if text must be wrapped
         */
        get textWrapping(): TextWrapping | boolean;
        /**
         * Gets or sets a boolean indicating if text must be wrapped
         */
        set textWrapping(value: TextWrapping | boolean);
        /**
         * Gets or sets text to display
         */
        get text(): string;
        /**
         * Gets or sets text to display
         */
        set text(value: string);
        /**
         * Gets or sets text horizontal alignment (BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER by default)
         */
        get textHorizontalAlignment(): number;
        /**
         * Gets or sets text horizontal alignment (BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER by default)
         */
        set textHorizontalAlignment(value: number);
        /**
         * Gets or sets text vertical alignment (BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER by default)
         */
        get textVerticalAlignment(): number;
        /**
         * Gets or sets text vertical alignment (BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER by default)
         */
        set textVerticalAlignment(value: number);
        /**
         * Gets or sets line spacing value
         */
        set lineSpacing(value: string | number);
        /**
         * Gets or sets line spacing value
         */
        get lineSpacing(): string | number;
        /**
         * Gets or sets outlineWidth of the text to display
         */
        get outlineWidth(): number;
        /**
         * Gets or sets outlineWidth of the text to display
         */
        set outlineWidth(value: number);
        /**
         * Gets or sets a boolean indicating that text must have underline
         */
        get underline(): boolean;
        /**
         * Gets or sets a boolean indicating that text must have underline
         */
        set underline(value: boolean);
        /**
         * Gets or sets an boolean indicating that text must be crossed out
         */
        get lineThrough(): boolean;
        /**
         * Gets or sets an boolean indicating that text must be crossed out
         */
        set lineThrough(value: boolean);
        /**
         * Gets or sets outlineColor of the text to display
         */
        get outlineColor(): string;
        /**
         * Gets or sets outlineColor of the text to display
         */
        set outlineColor(value: string);
        /**
         * Creates a new TextBlock object
         * @param name defines the name of the control
         * @param text defines the text to display (emptry string by default)
         */
        constructor(
        /**
         * Defines the name of the control
         */
        name?: string | undefined, text?: string);
        protected _getTypeName(): string;
        protected _processMeasures(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        private _drawText;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Nullable<Measure>): void;
        protected _applyStates(context: CanvasRenderingContext2D): void;
        protected _breakLines(refWidth: number, context: CanvasRenderingContext2D): object[];
        protected _parseLine(line: string | undefined, context: CanvasRenderingContext2D): object;
        protected _parseLineEllipsis(line: string | undefined, width: number, context: CanvasRenderingContext2D): object;
        protected _parseLineWordWrap(line: string | undefined, width: number, context: CanvasRenderingContext2D): object[];
        protected _renderLines(context: CanvasRenderingContext2D): void;
        /**
         * Given a width constraint applied on the text block, find the expected height
         * @returns expected height
         */
        computeExpectedHeight(): number;
        dispose(): void;
    }
}
declare module "babylonjs-gui/2D/controls/image" {
    import { Nullable } from "babylonjs/types";
    import { Observable } from "babylonjs/Misc/observable";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { Measure } from "babylonjs-gui/2D/measure";
    /**
     * Class used to create 2D images
     */
    export class Image extends Control {
        name?: string | undefined;
        private _workingCanvas;
        private _domImage;
        private _imageWidth;
        private _imageHeight;
        private _loaded;
        private _stretch;
        private _source;
        private _autoScale;
        private _sourceLeft;
        private _sourceTop;
        private _sourceWidth;
        private _sourceHeight;
        private _svgAttributesComputationCompleted;
        private _isSVG;
        private _cellWidth;
        private _cellHeight;
        private _cellId;
        private _sliceLeft;
        private _sliceRight;
        private _sliceTop;
        private _sliceBottom;
        private _populateNinePatchSlicesFromImage;
        private _detectPointerOnOpaqueOnly;
        private _imageDataCache;
        /**
         * Observable notified when the content is loaded
         */
        onImageLoadedObservable: Observable<Image>;
        /**
         * Observable notified when _sourceLeft, _sourceTop, _sourceWidth and _sourceHeight are computed
         */
        onSVGAttributesComputedObservable: Observable<Image>;
        /**
         * Gets a boolean indicating that the content is loaded
         */
        get isLoaded(): boolean;
        /**
         * Gets or sets a boolean indicating if pointers should only be validated on pixels with alpha > 0.
         * Beware using this as this will comsume more memory as the image has to be stored twice
         */
        get detectPointerOnOpaqueOnly(): boolean;
        set detectPointerOnOpaqueOnly(value: boolean);
        /**
         * Gets or sets the left value for slicing (9-patch)
         */
        get sliceLeft(): number;
        set sliceLeft(value: number);
        /**
         * Gets or sets the right value for slicing (9-patch)
         */
        get sliceRight(): number;
        set sliceRight(value: number);
        /**
         * Gets or sets the top value for slicing (9-patch)
         */
        get sliceTop(): number;
        set sliceTop(value: number);
        /**
         * Gets or sets the bottom value for slicing (9-patch)
         */
        get sliceBottom(): number;
        set sliceBottom(value: number);
        /**
         * Gets or sets the left coordinate in the source image
         */
        get sourceLeft(): number;
        set sourceLeft(value: number);
        /**
         * Gets or sets the top coordinate in the source image
         */
        get sourceTop(): number;
        set sourceTop(value: number);
        /**
         * Gets or sets the width to capture in the source image
         */
        get sourceWidth(): number;
        set sourceWidth(value: number);
        /**
         * Gets or sets the height to capture in the source image
         */
        get sourceHeight(): number;
        set sourceHeight(value: number);
        /**
         * Gets the image width
         */
        get imageWidth(): number;
        /**
         * Gets the image height
         */
        get imageHeight(): number;
        /**
        * Gets or sets a boolean indicating if nine patch slices (left, top, right, bottom) should be read from image data
        */
        get populateNinePatchSlicesFromImage(): boolean;
        set populateNinePatchSlicesFromImage(value: boolean);
        /** Indicates if the format of the image is SVG */
        get isSVG(): boolean;
        /** Gets the status of the SVG attributes computation (sourceLeft, sourceTop, sourceWidth, sourceHeight) */
        get svgAttributesComputationCompleted(): boolean;
        /**
         * Gets or sets a boolean indicating if the image can force its container to adapt its size
         * @see https://doc.babylonjs.com/how_to/gui#image
         */
        get autoScale(): boolean;
        set autoScale(value: boolean);
        /** Gets or sets the streching mode used by the image */
        get stretch(): number;
        set stretch(value: number);
        /** @hidden */
        _rotate90(n: number, preserveProperties?: boolean): Image;
        private _handleRotationForSVGImage;
        private _rotate90SourceProperties;
        private _extractNinePatchSliceDataFromImage;
        /**
         * Gets or sets the internal DOM image used to render the control
         */
        set domImage(value: HTMLImageElement);
        get domImage(): HTMLImageElement;
        private _onImageLoaded;
        /**
         * Gets the image source url
         */
        get source(): Nullable<string>;
        /**
         * Gets or sets image source url
         */
        set source(value: Nullable<string>);
        /**
         * Checks for svg document with icon id present
         */
        private _svgCheck;
        /**
         * Sets sourceLeft, sourceTop, sourceWidth, sourceHeight automatically
         * given external svg file and icon id
         */
        private _getSVGAttribs;
        /**
         * Gets or sets the cell width to use when animation sheet is enabled
         * @see https://doc.babylonjs.com/how_to/gui#image
         */
        get cellWidth(): number;
        set cellWidth(value: number);
        /**
         * Gets or sets the cell height to use when animation sheet is enabled
         * @see https://doc.babylonjs.com/how_to/gui#image
         */
        get cellHeight(): number;
        set cellHeight(value: number);
        /**
         * Gets or sets the cell id to use (this will turn on the animation sheet mode)
         * @see https://doc.babylonjs.com/how_to/gui#image
         */
        get cellId(): number;
        set cellId(value: number);
        /**
         * Creates a new Image
         * @param name defines the control name
         * @param url defines the image url
         */
        constructor(name?: string | undefined, url?: Nullable<string>);
        /**
         * Tests if a given coordinates belong to the current control
         * @param x defines x coordinate to test
         * @param y defines y coordinate to test
         * @returns true if the coordinates are inside the control
         */
        contains(x: number, y: number): boolean;
        protected _getTypeName(): string;
        /** Force the control to synchronize with its content */
        synchronizeSizeWithContent(): void;
        protected _processMeasures(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        private _prepareWorkingCanvasForOpaqueDetection;
        private _drawImage;
        _draw(context: CanvasRenderingContext2D): void;
        private _renderNinePatch;
        dispose(): void;
        /** STRETCH_NONE */
        static readonly STRETCH_NONE: number;
        /** STRETCH_FILL */
        static readonly STRETCH_FILL: number;
        /** STRETCH_UNIFORM */
        static readonly STRETCH_UNIFORM: number;
        /** STRETCH_EXTEND */
        static readonly STRETCH_EXTEND: number;
        /** NINE_PATCH */
        static readonly STRETCH_NINE_PATCH: number;
    }
}
declare module "babylonjs-gui/2D/controls/button" {
    import { Nullable } from "babylonjs/types";
    import { Vector2 } from "babylonjs/Maths/math.vector";
    import { Rectangle } from "babylonjs-gui/2D/controls/rectangle";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { TextBlock } from "babylonjs-gui/2D/controls/textBlock";
    import { Image } from "babylonjs-gui/2D/controls/image";
    import { PointerInfoBase } from 'babylonjs/Events/pointerEvents';
    /**
     * Class used to create 2D buttons
     */
    export class Button extends Rectangle {
        name?: string | undefined;
        /**
         * Function called to generate a pointer enter animation
         */
        pointerEnterAnimation: () => void;
        /**
         * Function called to generate a pointer out animation
         */
        pointerOutAnimation: () => void;
        /**
         * Function called to generate a pointer down animation
         */
        pointerDownAnimation: () => void;
        /**
         * Function called to generate a pointer up animation
         */
        pointerUpAnimation: () => void;
        /**
         * Gets or sets a boolean indicating that the button will let internal controls handle picking instead of doing it directly using its bounding info
         */
        delegatePickingToChildren: boolean;
        private _image;
        /**
         * Returns the image part of the button (if any)
         */
        get image(): Nullable<Image>;
        private _textBlock;
        /**
         * Returns the image part of the button (if any)
         */
        get textBlock(): Nullable<TextBlock>;
        /**
         * Creates a new Button
         * @param name defines the name of the button
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        /** @hidden */
        _processPicking(x: number, y: number, pi: PointerInfoBase, type: number, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
        /** @hidden */
        _onPointerEnter(target: Control, pi: PointerInfoBase): boolean;
        /** @hidden */
        _onPointerOut(target: Control, pi: PointerInfoBase, force?: boolean): void;
        /** @hidden */
        _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
        /** @hidden */
        _onPointerUp(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi: PointerInfoBase): void;
        /**
         * Creates a new button made with an image and a text
         * @param name defines the name of the button
         * @param text defines the text of the button
         * @param imageUrl defines the url of the image
         * @returns a new Button
         */
        static CreateImageButton(name: string, text: string, imageUrl: string): Button;
        /**
         * Creates a new button made with an image
         * @param name defines the name of the button
         * @param imageUrl defines the url of the image
         * @returns a new Button
         */
        static CreateImageOnlyButton(name: string, imageUrl: string): Button;
        /**
         * Creates a new button made with a text
         * @param name defines the name of the button
         * @param text defines the text of the button
         * @returns a new Button
         */
        static CreateSimpleButton(name: string, text: string): Button;
        /**
         * Creates a new button made with an image and a centered text
         * @param name defines the name of the button
         * @param text defines the text of the button
         * @param imageUrl defines the url of the image
         * @returns a new Button
         */
        static CreateImageWithCenterTextButton(name: string, text: string, imageUrl: string): Button;
    }
}
declare module "babylonjs-gui/2D/controls/stackPanel" {
    import { Container } from "babylonjs-gui/2D/controls/container";
    import { Measure } from "babylonjs-gui/2D/measure";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    /**
     * Class used to create a 2D stack panel container
     */
    export class StackPanel extends Container {
        name?: string | undefined;
        private _isVertical;
        private _manualWidth;
        private _manualHeight;
        private _doNotTrackManualChanges;
        /**
         * Gets or sets a boolean indicating that layou warnings should be ignored
         */
        ignoreLayoutWarnings: boolean;
        /** Gets or sets a boolean indicating if the stack panel is vertical or horizontal*/
        get isVertical(): boolean;
        set isVertical(value: boolean);
        /**
         * Gets or sets panel width.
         * This value should not be set when in horizontal mode as it will be computed automatically
         */
        set width(value: string | number);
        get width(): string | number;
        /**
         * Gets or sets panel height.
         * This value should not be set when in vertical mode as it will be computed automatically
         */
        set height(value: string | number);
        get height(): string | number;
        /**
         * Creates a new StackPanel
         * @param name defines control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        /** @hidden */
        protected _preMeasure(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        protected _postMeasure(): void;
        /**
         * Serializes the current control
         * @param serializationObject defined the JSON serialized object
         */
        serialize(serializationObject: any): void;
        /** @hidden */
        _parseFromContent(serializedObject: any, host: AdvancedDynamicTexture): void;
    }
}
declare module "babylonjs-gui/2D/controls/checkbox" {
    import { Observable } from "babylonjs/Misc/observable";
    import { Vector2 } from "babylonjs/Maths/math.vector";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { StackPanel } from "babylonjs-gui/2D/controls/stackPanel";
    import { Nullable } from 'babylonjs/types';
    import { Measure } from "babylonjs-gui/2D/measure";
    import { PointerInfoBase } from 'babylonjs/Events/pointerEvents';
    /**
     * Class used to represent a 2D checkbox
     */
    export class Checkbox extends Control {
        name?: string | undefined;
        private _isChecked;
        private _background;
        private _checkSizeRatio;
        private _thickness;
        /** Gets or sets border thickness  */
        get thickness(): number;
        set thickness(value: number);
        /**
         * Observable raised when isChecked property changes
         */
        onIsCheckedChangedObservable: Observable<boolean>;
        /** Gets or sets a value indicating the ratio between overall size and check size */
        get checkSizeRatio(): number;
        set checkSizeRatio(value: number);
        /** Gets or sets background color */
        get background(): string;
        set background(value: string);
        /** Gets or sets a boolean indicating if the checkbox is checked or not */
        get isChecked(): boolean;
        set isChecked(value: boolean);
        /**
         * Creates a new CheckBox
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Nullable<Measure>): void;
        /** @hidden */
        _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
        /**
         * Utility function to easily create a checkbox with a header
         * @param title defines the label to use for the header
         * @param onValueChanged defines the callback to call when value changes
         * @returns a StackPanel containing the checkbox and a textBlock
         */
        static AddCheckBoxWithHeader(title: string, onValueChanged: (value: boolean) => void): StackPanel;
    }
}
declare module "babylonjs-gui/2D/controls/virtualKeyboard" {
    import { Nullable } from "babylonjs/types";
    import { Observable } from "babylonjs/Misc/observable";
    import { StackPanel } from "babylonjs-gui/2D/controls/stackPanel";
    import { InputText } from "babylonjs-gui/2D/controls/inputText";
    /**
     * Class used to store key control properties
     */
    export class KeyPropertySet {
        /** Width */
        width?: string;
        /** Height */
        height?: string;
        /** Left padding */
        paddingLeft?: string;
        /** Right padding */
        paddingRight?: string;
        /** Top padding */
        paddingTop?: string;
        /** Bottom padding */
        paddingBottom?: string;
        /** Foreground color */
        color?: string;
        /** Background color */
        background?: string;
    }
    /**
     * Class used to create virtual keyboard
     */
    export class VirtualKeyboard extends StackPanel {
        /** Observable raised when a key is pressed */
        onKeyPressObservable: Observable<string>;
        /** Gets or sets default key button width */
        defaultButtonWidth: string;
        /** Gets or sets default key button height */
        defaultButtonHeight: string;
        /** Gets or sets default key button left padding */
        defaultButtonPaddingLeft: string;
        /** Gets or sets default key button right padding */
        defaultButtonPaddingRight: string;
        /** Gets or sets default key button top padding */
        defaultButtonPaddingTop: string;
        /** Gets or sets default key button bottom padding */
        defaultButtonPaddingBottom: string;
        /** Gets or sets default key button foreground color */
        defaultButtonColor: string;
        /** Gets or sets default key button background color */
        defaultButtonBackground: string;
        /** Gets or sets shift button foreground color */
        shiftButtonColor: string;
        /** Gets or sets shift button thickness*/
        selectedShiftThickness: number;
        /** Gets shift key state */
        shiftState: number;
        protected _getTypeName(): string;
        private _createKey;
        /**
         * Adds a new row of keys
         * @param keys defines the list of keys to add
         * @param propertySets defines the associated property sets
         */
        addKeysRow(keys: Array<string>, propertySets?: Array<KeyPropertySet>): void;
        /**
         * Set the shift key to a specific state
         * @param shiftState defines the new shift state
         */
        applyShiftState(shiftState: number): void;
        private _currentlyConnectedInputText;
        private _connectedInputTexts;
        private _onKeyPressObserver;
        /** Gets the input text control currently attached to the keyboard */
        get connectedInputText(): Nullable<InputText>;
        /**
         * Connects the keyboard with an input text control
         *
         * @param input defines the target control
         */
        connect(input: InputText): void;
        /**
         * Disconnects the keyboard from connected InputText controls
         *
         * @param input optionally defines a target control, otherwise all are disconnected
         */
        disconnect(input?: InputText): void;
        private _removeConnectedInputObservables;
        /**
         * Release all resources
         */
        dispose(): void;
        /**
         * Creates a new keyboard using a default layout
         *
         * @param name defines control name
         * @returns a new VirtualKeyboard
         */
        static CreateDefaultLayout(name?: string): VirtualKeyboard;
    }
}
declare module "babylonjs-gui/2D/controls/textWrapper" {
    /** @hidden */
    export class TextWrapper {
        private _text;
        private _characters;
        get text(): string;
        set text(txt: string);
        get length(): number;
        removePart(idxStart: number, idxEnd: number, insertTxt?: string): void;
        charAt(idx: number): string;
        substr(from: number, length?: number): string;
        substring(from: number, to?: number): string;
        isWord(index: number): boolean;
    }
}
declare module "babylonjs-gui/2D/controls/inputText" {
    import { Nullable } from "babylonjs/types";
    import { Observable } from "babylonjs/Misc/observable";
    import { Vector2 } from "babylonjs/Maths/math.vector";
    import { PointerInfoBase } from 'babylonjs/Events/pointerEvents';
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { IFocusableControl } from "babylonjs-gui/2D/controls/focusableControl";
    import { VirtualKeyboard } from "babylonjs-gui/2D/controls/virtualKeyboard";
    import { Measure } from "babylonjs-gui/2D/measure";
    import { TextWrapper } from "babylonjs-gui/2D/controls/textWrapper";
    import { IKeyboardEvent } from 'babylonjs/Events/deviceInputEvents';
    /**
     * Class used to create input text control
     */
    export class InputText extends Control implements IFocusableControl {
        name?: string | undefined;
        private _textWrapper;
        private _placeholderText;
        private _background;
        private _focusedBackground;
        private _focusedColor;
        private _placeholderColor;
        private _thickness;
        private _margin;
        private _autoStretchWidth;
        private _maxWidth;
        private _isFocused;
        private _blinkTimeout;
        private _blinkIsEven;
        private _cursorOffset;
        private _scrollLeft;
        private _textWidth;
        private _clickedCoordinate;
        private _deadKey;
        private _addKey;
        private _currentKey;
        private _isTextHighlightOn;
        private _textHighlightColor;
        private _highligherOpacity;
        private _highlightedText;
        private _startHighlightIndex;
        private _endHighlightIndex;
        private _cursorIndex;
        private _onFocusSelectAll;
        private _isPointerDown;
        private _onClipboardObserver;
        private _onPointerDblTapObserver;
        /** @hidden */
        _connectedVirtualKeyboard: Nullable<VirtualKeyboard>;
        /** Gets or sets a string representing the message displayed on mobile when the control gets the focus */
        promptMessage: string;
        /** Force disable prompt on mobile device */
        disableMobilePrompt: boolean;
        /** Observable raised when the text changes */
        onTextChangedObservable: Observable<InputText>;
        /** Observable raised just before an entered character is to be added */
        onBeforeKeyAddObservable: Observable<InputText>;
        /** Observable raised when the control gets the focus */
        onFocusObservable: Observable<InputText>;
        /** Observable raised when the control loses the focus */
        onBlurObservable: Observable<InputText>;
        /**Observable raised when the text is highlighted */
        onTextHighlightObservable: Observable<InputText>;
        /**Observable raised when copy event is triggered */
        onTextCopyObservable: Observable<InputText>;
        /** Observable raised when cut event is triggered */
        onTextCutObservable: Observable<InputText>;
        /** Observable raised when paste event is triggered */
        onTextPasteObservable: Observable<InputText>;
        /** Observable raised when a key event was processed */
        onKeyboardEventProcessedObservable: Observable<IKeyboardEvent>;
        /** Gets or sets the maximum width allowed by the control */
        get maxWidth(): string | number;
        /** Gets the maximum width allowed by the control in pixels */
        get maxWidthInPixels(): number;
        set maxWidth(value: string | number);
        /** Gets or sets the text highlighter transparency; default: 0.4 */
        get highligherOpacity(): number;
        set highligherOpacity(value: number);
        /** Gets or sets a boolean indicating whether to select complete text by default on input focus */
        get onFocusSelectAll(): boolean;
        set onFocusSelectAll(value: boolean);
        /** Gets or sets the text hightlight color */
        get textHighlightColor(): string;
        set textHighlightColor(value: string);
        /** Gets or sets control margin */
        get margin(): string;
        /** Gets control margin in pixels */
        get marginInPixels(): number;
        set margin(value: string);
        /** Gets or sets a boolean indicating if the control can auto stretch its width to adapt to the text */
        get autoStretchWidth(): boolean;
        set autoStretchWidth(value: boolean);
        /** Gets or sets border thickness */
        get thickness(): number;
        set thickness(value: number);
        /** Gets or sets the background color when focused */
        get focusedBackground(): string;
        set focusedBackground(value: string);
        /** Gets or sets the background color when focused */
        get focusedColor(): string;
        set focusedColor(value: string);
        /** Gets or sets the background color */
        get background(): string;
        set background(value: string);
        /** Gets or sets the placeholder color */
        get placeholderColor(): string;
        set placeholderColor(value: string);
        /** Gets or sets the text displayed when the control is empty */
        get placeholderText(): string;
        set placeholderText(value: string);
        /** Gets or sets the dead key flag */
        get deadKey(): boolean;
        set deadKey(flag: boolean);
        /** Gets or sets the highlight text */
        get highlightedText(): string;
        set highlightedText(text: string);
        /** Gets or sets if the current key should be added */
        get addKey(): boolean;
        set addKey(flag: boolean);
        /** Gets or sets the value of the current key being entered */
        get currentKey(): string;
        set currentKey(key: string);
        /** Gets or sets the text displayed in the control */
        get text(): string;
        set text(value: string);
        private _textHasChanged;
        /** Gets or sets control width */
        get width(): string | number;
        set width(value: string | number);
        /**
         * Creates a new InputText
         * @param name defines the control name
         * @param text defines the text of the control
         */
        constructor(name?: string | undefined, text?: string);
        /** @hidden */
        onBlur(): void;
        /** @hidden */
        onFocus(): void;
        /**
         * Function to focus an inputText programmatically
         */
        focus(): void;
        /**
         * Function to unfocus an inputText programmatically
         */
        blur(): void;
        protected _getTypeName(): string;
        /**
         * Function called to get the list of controls that should not steal the focus from this control
         * @returns an array of controls
         */
        keepsFocusWith(): Nullable<Control[]>;
        /** @hidden */
        processKey(keyCode: number, key?: string, evt?: IKeyboardEvent): void;
        /** @hidden */
        private _updateValueFromCursorIndex;
        /** @hidden */
        private _processDblClick;
        /** @hidden */
        private _selectAllText;
        /**
         * Handles the keyboard event
         * @param evt Defines the KeyboardEvent
         */
        processKeyboard(evt: IKeyboardEvent): void;
        /** @hidden */
        private _onCopyText;
        /** @hidden */
        private _onCutText;
        /** @hidden */
        private _onPasteText;
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Nullable<Measure>): void;
        _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
        _onPointerMove(target: Control, coordinates: Vector2, pointerId: number, pi: PointerInfoBase): void;
        _onPointerUp(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean): void;
        protected _beforeRenderText(textWrapper: TextWrapper): TextWrapper;
        dispose(): void;
    }
}
declare module "babylonjs-gui/2D/controls/grid" {
    import { Nullable } from "babylonjs/types";
    import { Container } from "babylonjs-gui/2D/controls/container";
    import { ValueAndUnit } from "babylonjs-gui/2D/valueAndUnit";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { Measure } from "babylonjs-gui/2D/measure";
    /**
     * Class used to create a 2D grid container
     */
    export class Grid extends Container {
        name?: string | undefined;
        private _rowDefinitions;
        private _columnDefinitions;
        private _cells;
        private _childControls;
        /**
         * Gets the number of columns
         */
        get columnCount(): number;
        /**
         * Gets the number of rows
         */
        get rowCount(): number;
        /** Gets the list of children */
        get children(): Control[];
        /** Gets the list of cells (e.g. the containers) */
        get cells(): {
            [key: string]: Container;
        };
        /**
         * Gets the definition of a specific row
         * @param index defines the index of the row
         * @returns the row definition
         */
        getRowDefinition(index: number): Nullable<ValueAndUnit>;
        /**
         * Gets the definition of a specific column
         * @param index defines the index of the column
         * @returns the column definition
         */
        getColumnDefinition(index: number): Nullable<ValueAndUnit>;
        /**
         * Adds a new row to the grid
         * @param height defines the height of the row (either in pixel or a value between 0 and 1)
         * @param isPixel defines if the height is expressed in pixel (or in percentage)
         * @returns the current grid
         */
        addRowDefinition(height: number, isPixel?: boolean): Grid;
        /**
         * Adds a new column to the grid
         * @param width defines the width of the column (either in pixel or a value between 0 and 1)
         * @param isPixel defines if the width is expressed in pixel (or in percentage)
         * @returns the current grid
         */
        addColumnDefinition(width: number, isPixel?: boolean): Grid;
        /**
         * Update a row definition
         * @param index defines the index of the row to update
         * @param height defines the height of the row (either in pixel or a value between 0 and 1)
         * @param isPixel defines if the weight is expressed in pixel (or in percentage)
         * @returns the current grid
         */
        setRowDefinition(index: number, height: number, isPixel?: boolean): Grid;
        /**
         * Update a column definition
         * @param index defines the index of the column to update
         * @param width defines the width of the column (either in pixel or a value between 0 and 1)
         * @param isPixel defines if the width is expressed in pixel (or in percentage)
         * @returns the current grid
         */
        setColumnDefinition(index: number, width: number, isPixel?: boolean): Grid;
        /**
         * Gets the list of children stored in a specific cell
         * @param row defines the row to check
         * @param column defines the column to check
         * @returns the list of controls
         */
        getChildrenAt(row: number, column: number): Nullable<Array<Control>>;
        /**
         * Gets a string representing the child cell info (row x column)
         * @param child defines the control to get info from
         * @returns a string containing the child cell info (row x column)
         */
        getChildCellInfo(child: Control): string;
        private _removeCell;
        private _offsetCell;
        /**
         * Remove a column definition at specified index
         * @param index defines the index of the column to remove
         * @returns the current grid
         */
        removeColumnDefinition(index: number): Grid;
        /**
         * Remove a row definition at specified index
         * @param index defines the index of the row to remove
         * @returns the current grid
         */
        removeRowDefinition(index: number): Grid;
        /**
         * Adds a new control to the current grid
         * @param control defines the control to add
         * @param row defines the row where to add the control (0 by default)
         * @param column defines the column where to add the control (0 by default)
         * @returns the current grid
         */
        addControl(control: Control, row?: number, column?: number): Grid;
        /**
         * Removes a control from the current container
         * @param control defines the control to remove
         * @returns the current container
         */
        removeControl(control: Control): Container;
        /**
         * Creates a new Grid
         * @param name defines control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _getGridDefinitions(definitionCallback: (lefts: number[], tops: number[], widths: number[], heights: number[]) => void): void;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        _flagDescendantsAsMatrixDirty(): void;
        _renderHighlightSpecific(context: CanvasRenderingContext2D): void;
        /** Releases associated resources */
        dispose(): void;
    }
}
declare module "babylonjs-gui/2D/controls/colorpicker" {
    import { Observable } from "babylonjs/Misc/observable";
    import { Vector2 } from "babylonjs/Maths/math.vector";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { Measure } from "babylonjs-gui/2D/measure";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    import { Color3 } from 'babylonjs/Maths/math.color';
    import { PointerInfoBase } from 'babylonjs/Events/pointerEvents';
    /** Class used to create color pickers */
    export class ColorPicker extends Control {
        name?: string | undefined;
        private static _Epsilon;
        private _colorWheelCanvas;
        private _value;
        private _tmpColor;
        private _pointerStartedOnSquare;
        private _pointerStartedOnWheel;
        private _squareLeft;
        private _squareTop;
        private _squareSize;
        private _h;
        private _s;
        private _v;
        private _lastPointerDownId;
        /**
         * Observable raised when the value changes
         */
        onValueChangedObservable: Observable<Color3>;
        /** Gets or sets the color of the color picker */
        get value(): Color3;
        set value(value: Color3);
        /**
         * Gets or sets control width
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get width(): string | number;
        set width(value: string | number);
        /**
         * Gets or sets control height
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get height(): string | number;
        /** Gets or sets control height */
        set height(value: string | number);
        /** Gets or sets control size */
        get size(): string | number;
        set size(value: string | number);
        /**
         * Creates a new ColorPicker
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        /** @hidden */
        protected _preMeasure(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        private _updateSquareProps;
        private _drawGradientSquare;
        private _drawCircle;
        private _createColorWheelCanvas;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D): void;
        private _pointerIsDown;
        private _updateValueFromPointer;
        private _isPointOnSquare;
        private _isPointOnWheel;
        _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
        _onPointerMove(target: Control, coordinates: Vector2, pointerId: number, pi: PointerInfoBase): void;
        _onPointerUp(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi: PointerInfoBase): void;
        _onCanvasBlur(): void;
        /**
         * This function expands the color picker by creating a color picker dialog with manual
         * color value input and the ability to save colors into an array to be used later in
         * subsequent launches of the dialogue.
         * @param advancedTexture defines the AdvancedDynamicTexture the dialog is assigned to
         * @param options defines size for dialog and options for saved colors. Also accepts last color picked as hex string and saved colors array as hex strings.
         * @returns picked color as a hex string and the saved colors array as hex strings.
         */
        static ShowPickerDialogAsync(advancedTexture: AdvancedDynamicTexture, options: {
            pickerWidth?: string;
            pickerHeight?: string;
            headerHeight?: string;
            lastColor?: string;
            swatchLimit?: number;
            numSwatchesPerLine?: number;
            savedColors?: Array<string>;
        }): Promise<{
            savedColors?: string[];
            pickedColor: string;
        }>;
    }
}
declare module "babylonjs-gui/2D/controls/ellipse" {
    import { Container } from "babylonjs-gui/2D/controls/container";
    import { Measure } from "babylonjs-gui/2D/measure";
    /** Class used to create 2D ellipse containers */
    export class Ellipse extends Container {
        name?: string | undefined;
        private _thickness;
        /** Gets or sets border thickness */
        get thickness(): number;
        set thickness(value: number);
        /**
         * Creates a new Ellipse
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _localDraw(context: CanvasRenderingContext2D): void;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        protected _clipForChildren(context: CanvasRenderingContext2D): void;
    }
}
declare module "babylonjs-gui/2D/controls/focusableButton" {
    import { Nullable } from "babylonjs/types";
    import { Vector2 } from "babylonjs/Maths/math.vector";
    import { Button } from "babylonjs-gui/2D/controls/button";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { PointerInfoBase } from 'babylonjs/Events/pointerEvents';
    import { IFocusableControl } from "babylonjs-gui/2D/controls/focusableControl";
    import { Observable } from 'babylonjs/Misc/observable';
    import { IKeyboardEvent } from "babylonjs/Events/deviceInputEvents";
    /**
     * Class used to create a focusable button that can easily handle keyboard events
     */
    export class FocusableButton extends Button implements IFocusableControl {
        name?: string | undefined;
        /** Highlight color when button is focused */
        focusedColor: Nullable<string>;
        private _isFocused;
        private _unfocusedColor;
        /** Observable raised when the control gets the focus */
        onFocusObservable: Observable<Button>;
        /** Observable raised when the control loses the focus */
        onBlurObservable: Observable<Button>;
        /** Observable raised when a key event was processed */
        onKeyboardEventProcessedObservable: Observable<IKeyboardEvent>;
        constructor(name?: string | undefined);
        /** @hidden */
        onBlur(): void;
        /** @hidden */
        onFocus(): void;
        /**
         * Function called to get the list of controls that should not steal the focus from this control
         * @returns an array of controls
         */
        keepsFocusWith(): Nullable<Control[]>;
        /**
         * Function to focus a button programmatically
         */
        focus(): void;
        /**
         * Function to unfocus a button programmatically
         */
        blur(): void;
        /**
         * Handles the keyboard event
         * @param evt Defines the KeyboardEvent
         */
        processKeyboard(evt: IKeyboardEvent): void;
        /** @hidden */
        _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
        /** @hidden */
        displose(): void;
    }
}
declare module "babylonjs-gui/2D/controls/inputPassword" {
    import { InputText } from "babylonjs-gui/2D/controls/inputText";
    import { TextWrapper } from "babylonjs-gui/2D/controls/textWrapper";
    /**
     * Class used to create a password control
     */
    export class InputPassword extends InputText {
        protected _beforeRenderText(textWrapper: TextWrapper): TextWrapper;
    }
}
declare module "babylonjs-gui/2D/controls/line" {
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { Scene } from "babylonjs/scene";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { Measure } from "babylonjs-gui/2D/measure";
    /** Class used to render 2D lines */
    export class Line extends Control {
        name?: string | undefined;
        private _lineWidth;
        private _x1;
        private _y1;
        private _x2;
        private _y2;
        private _dash;
        private _connectedControl;
        private _connectedControlDirtyObserver;
        /** Gets or sets the dash pattern */
        get dash(): Array<number>;
        set dash(value: Array<number>);
        /** Gets or sets the control connected with the line end */
        get connectedControl(): Control;
        set connectedControl(value: Control);
        /** Gets or sets start coordinates on X axis */
        get x1(): string | number;
        set x1(value: string | number);
        /** Gets or sets start coordinates on Y axis */
        get y1(): string | number;
        set y1(value: string | number);
        /** Gets or sets end coordinates on X axis */
        get x2(): string | number;
        set x2(value: string | number);
        /** Gets or sets end coordinates on Y axis */
        get y2(): string | number;
        set y2(value: string | number);
        /** Gets or sets line width */
        get lineWidth(): number;
        set lineWidth(value: number);
        /** Gets or sets horizontal alignment */
        set horizontalAlignment(value: number);
        /** Gets or sets vertical alignment */
        set verticalAlignment(value: number);
        private get _effectiveX2();
        private get _effectiveY2();
        /**
         * Creates a new Line
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        _draw(context: CanvasRenderingContext2D): void;
        _measure(): void;
        protected _computeAlignment(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /**
         * Move one end of the line given 3D cartesian coordinates.
         * @param position Targeted world position
         * @param scene Scene
         * @param end (opt) Set to true to assign x2 and y2 coordinates of the line. Default assign to x1 and y1.
         */
        moveToVector3(position: Vector3, scene: Scene, end?: boolean): void;
        /**
         * Move one end of the line to a position in screen absolute space.
         * @param projectedPosition Position in screen absolute space (X, Y)
         * @param end (opt) Set to true to assign x2 and y2 coordinates of the line. Default assign to x1 and y1.
         */
        _moveToProjectedPosition(projectedPosition: Vector3, end?: boolean): void;
    }
}
declare module "babylonjs-gui/2D/multiLinePoint" {
    import { Nullable } from "babylonjs/types";
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { MultiLine } from "babylonjs-gui/2D/controls/multiLine";
    import { Control } from "babylonjs-gui/2D/controls/control";
    /**
     * Class used to store a point for a MultiLine object.
     * The point can be pure 2D coordinates, a mesh or a control
     */
    export class MultiLinePoint {
        private _multiLine;
        private _x;
        private _y;
        private _control;
        private _mesh;
        private _controlObserver;
        private _meshObserver;
        /** @hidden */
        _point: Vector3;
        /**
         * Creates a new MultiLinePoint
         * @param multiLine defines the source MultiLine object
         */
        constructor(multiLine: MultiLine);
        /** Gets or sets x coordinate */
        get x(): string | number;
        set x(value: string | number);
        /** Gets or sets y coordinate */
        get y(): string | number;
        set y(value: string | number);
        /** Gets or sets the control associated with this point */
        get control(): Nullable<Control>;
        set control(value: Nullable<Control>);
        /** Gets or sets the mesh associated with this point */
        get mesh(): Nullable<AbstractMesh>;
        set mesh(value: Nullable<AbstractMesh>);
        /** Resets links */
        resetLinks(): void;
        /**
         * Gets a translation vector with Z component
         * @returns the translation vector
         */
        translate(): Vector3;
        private _translatePoint;
        /** Release associated resources */
        dispose(): void;
    }
}
declare module "babylonjs-gui/2D/controls/multiLine" {
    import { Nullable } from "babylonjs/types";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { MultiLinePoint } from "babylonjs-gui/2D/multiLinePoint";
    import { Measure } from "babylonjs-gui/2D/measure";
    /**
     * Class used to create multi line control
     */
    export class MultiLine extends Control {
        name?: string | undefined;
        private _lineWidth;
        private _dash;
        private _points;
        private _minX;
        private _minY;
        private _maxX;
        private _maxY;
        /**
         * Creates a new MultiLine
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        /** Gets or sets dash pattern */
        get dash(): Array<number>;
        set dash(value: Array<number>);
        /**
         * Gets point stored at specified index
         * @param index defines the index to look for
         * @returns the requested point if found
         */
        getAt(index: number): MultiLinePoint;
        /** Function called when a point is updated */
        onPointUpdate: () => void;
        /**
         * Adds new points to the point collection
         * @param items defines the list of items (mesh, control or 2d coordiantes) to add
         * @returns the list of created MultiLinePoint
         */
        add(...items: (AbstractMesh | Control | {
            x: string | number;
            y: string | number;
        })[]): MultiLinePoint[];
        /**
         * Adds a new point to the point collection
         * @param item defines the item (mesh, control or 2d coordiantes) to add
         * @returns the created MultiLinePoint
         */
        push(item?: (AbstractMesh | Control | {
            x: string | number;
            y: string | number;
        })): MultiLinePoint;
        /**
         * Remove a specific value or point from the active point collection
         * @param value defines the value or point to remove
         */
        remove(value: number | MultiLinePoint): void;
        /**
         * Resets this object to initial state (no point)
         */
        reset(): void;
        /**
         * Resets all links
         */
        resetLinks(): void;
        /** Gets or sets line width */
        get lineWidth(): number;
        set lineWidth(value: number);
        set horizontalAlignment(value: number);
        set verticalAlignment(value: number);
        protected _getTypeName(): string;
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Nullable<Measure>): void;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        _measure(): void;
        protected _computeAlignment(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        dispose(): void;
    }
}
declare module "babylonjs-gui/2D/controls/radioButton" {
    import { Observable } from "babylonjs/Misc/observable";
    import { Vector2 } from "babylonjs/Maths/math.vector";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { StackPanel } from "babylonjs-gui/2D/controls/stackPanel";
    import { PointerInfoBase } from 'babylonjs/Events/pointerEvents';
    /**
     * Class used to create radio button controls
     */
    export class RadioButton extends Control {
        name?: string | undefined;
        private _isChecked;
        private _background;
        private _checkSizeRatio;
        private _thickness;
        /** Gets or sets border thickness */
        get thickness(): number;
        set thickness(value: number);
        /** Gets or sets group name */
        group: string;
        /** Observable raised when isChecked is changed */
        onIsCheckedChangedObservable: Observable<boolean>;
        /** Gets or sets a value indicating the ratio between overall size and check size */
        get checkSizeRatio(): number;
        set checkSizeRatio(value: number);
        /** Gets or sets background color */
        get background(): string;
        set background(value: string);
        /** Gets or sets a boolean indicating if the checkbox is checked or not */
        get isChecked(): boolean;
        set isChecked(value: boolean);
        /**
         * Creates a new RadioButton
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        _draw(context: CanvasRenderingContext2D): void;
        _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
        /**
         * Utility function to easily create a radio button with a header
         * @param title defines the label to use for the header
         * @param group defines the group to use for the radio button
         * @param isChecked defines the initial state of the radio button
         * @param onValueChanged defines the callback to call when value changes
         * @returns a StackPanel containing the radio button and a textBlock
         */
        static AddRadioButtonWithHeader(title: string, group: string, isChecked: boolean, onValueChanged: (button: RadioButton, value: boolean) => void): StackPanel;
    }
}
declare module "babylonjs-gui/2D/controls/sliders/baseSlider" {
    import { Observable } from "babylonjs/Misc/observable";
    import { Vector2 } from "babylonjs/Maths/math.vector";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { ValueAndUnit } from "babylonjs-gui/2D/valueAndUnit";
    import { PointerInfoBase } from 'babylonjs/Events/pointerEvents';
    /**
     * Class used to create slider controls
     */
    export class BaseSlider extends Control {
        name?: string | undefined;
        protected _thumbWidth: ValueAndUnit;
        private _minimum;
        private _maximum;
        private _value;
        private _isVertical;
        protected _barOffset: ValueAndUnit;
        private _isThumbClamped;
        protected _displayThumb: boolean;
        private _step;
        private _lastPointerDownId;
        protected _effectiveBarOffset: number;
        protected _renderLeft: number;
        protected _renderTop: number;
        protected _renderWidth: number;
        protected _renderHeight: number;
        protected _backgroundBoxLength: number;
        protected _backgroundBoxThickness: number;
        protected _effectiveThumbThickness: number;
        /** Observable raised when the sldier value changes */
        onValueChangedObservable: Observable<number>;
        /** Gets or sets a boolean indicating if the thumb must be rendered */
        get displayThumb(): boolean;
        set displayThumb(value: boolean);
        /** Gets or sets a step to apply to values (0 by default) */
        get step(): number;
        set step(value: number);
        /** Gets or sets main bar offset (ie. the margin applied to the value bar) */
        get barOffset(): string | number;
        /** Gets main bar offset in pixels*/
        get barOffsetInPixels(): number;
        set barOffset(value: string | number);
        /** Gets or sets thumb width */
        get thumbWidth(): string | number;
        /** Gets thumb width in pixels */
        get thumbWidthInPixels(): number;
        set thumbWidth(value: string | number);
        /** Gets or sets minimum value */
        get minimum(): number;
        set minimum(value: number);
        /** Gets or sets maximum value */
        get maximum(): number;
        set maximum(value: number);
        /** Gets or sets current value */
        get value(): number;
        set value(value: number);
        /**Gets or sets a boolean indicating if the slider should be vertical or horizontal */
        get isVertical(): boolean;
        set isVertical(value: boolean);
        /** Gets or sets a value indicating if the thumb can go over main bar extends */
        get isThumbClamped(): boolean;
        set isThumbClamped(value: boolean);
        /**
         * Creates a new BaseSlider
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _getThumbPosition(): number;
        protected _getThumbThickness(type: string): number;
        protected _prepareRenderingData(type: string): void;
        private _pointerIsDown;
        /** @hidden */
        protected _updateValueFromPointer(x: number, y: number): void;
        _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
        _onPointerMove(target: Control, coordinates: Vector2, pointerId: number, pi: PointerInfoBase): void;
        _onPointerUp(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean): void;
        _onCanvasBlur(): void;
    }
}
declare module "babylonjs-gui/2D/controls/sliders/slider" {
    import { BaseSlider } from "babylonjs-gui/2D/controls/sliders/baseSlider";
    import { Nullable } from 'babylonjs/types';
    import { Measure } from "babylonjs-gui/2D/measure";
    /**
     * Class used to create slider controls
     */
    export class Slider extends BaseSlider {
        name?: string | undefined;
        private _background;
        private _borderColor;
        private _thumbColor;
        private _isThumbCircle;
        protected _displayValueBar: boolean;
        /** Gets or sets a boolean indicating if the value bar must be rendered */
        get displayValueBar(): boolean;
        set displayValueBar(value: boolean);
        /** Gets or sets border color */
        get borderColor(): string;
        set borderColor(value: string);
        /** Gets or sets background color */
        get background(): string;
        set background(value: string);
        /** Gets or sets thumb's color */
        get thumbColor(): string;
        set thumbColor(value: string);
        /** Gets or sets a boolean indicating if the thumb should be round or square */
        get isThumbCircle(): boolean;
        set isThumbCircle(value: boolean);
        /**
         * Creates a new Slider
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Nullable<Measure>): void;
    }
}
declare module "babylonjs-gui/2D/controls/selector" {
    import { Rectangle } from "babylonjs-gui/2D/controls/rectangle";
    import { StackPanel } from "babylonjs-gui/2D/controls/stackPanel";
    /** Class used to create a RadioGroup
     * which contains groups of radio buttons
    */
    export class SelectorGroup {
        /** name of SelectorGroup */
        name: string;
        private _groupPanel;
        private _selectors;
        private _groupHeader;
        /**
         * Creates a new SelectorGroup
         * @param name of group, used as a group heading
         */
        constructor(
        /** name of SelectorGroup */
        name: string);
        /** Gets the groupPanel of the SelectorGroup  */
        get groupPanel(): StackPanel;
        /** Gets the selectors array */
        get selectors(): StackPanel[];
        /** Gets and sets the group header */
        get header(): string;
        set header(label: string);
        /** @hidden */
        private _addGroupHeader;
        /** @hidden*/
        _getSelector(selectorNb: number): StackPanel | undefined;
        /** Removes the selector at the given position
        * @param selectorNb the position of the selector within the group
       */
        removeSelector(selectorNb: number): void;
    }
    /** Class used to create a CheckboxGroup
     * which contains groups of checkbox buttons
    */
    export class CheckboxGroup extends SelectorGroup {
        /** Adds a checkbox as a control
         * @param text is the label for the selector
         * @param func is the function called when the Selector is checked
         * @param checked is true when Selector is checked
         */
        addCheckbox(text: string, func?: (s: boolean) => void, checked?: boolean): void;
        /** @hidden */
        _setSelectorLabel(selectorNb: number, label: string): void;
        /** @hidden */
        _setSelectorLabelColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonBackground(selectorNb: number, color: string): void;
    }
    /** Class used to create a RadioGroup
     * which contains groups of radio buttons
    */
    export class RadioGroup extends SelectorGroup {
        private _selectNb;
        /** Adds a radio button as a control
         * @param label is the label for the selector
         * @param func is the function called when the Selector is checked
         * @param checked is true when Selector is checked
         */
        addRadio(label: string, func?: (n: number) => void, checked?: boolean): void;
        /** @hidden */
        _setSelectorLabel(selectorNb: number, label: string): void;
        /** @hidden */
        _setSelectorLabelColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonBackground(selectorNb: number, color: string): void;
    }
    /** Class used to create a SliderGroup
     * which contains groups of slider buttons
    */
    export class SliderGroup extends SelectorGroup {
        /**
         * Adds a slider to the SelectorGroup
         * @param label is the label for the SliderBar
         * @param func is the function called when the Slider moves
         * @param unit is a string describing the units used, eg degrees or metres
         * @param min is the minimum value for the Slider
         * @param max is the maximum value for the Slider
         * @param value is the start value for the Slider between min and max
         * @param onValueChange is the function used to format the value displayed, eg radians to degrees
         */
        addSlider(label: string, func?: (v: number) => void, unit?: string, min?: number, max?: number, value?: number, onValueChange?: (v: number) => number): void;
        /** @hidden */
        _setSelectorLabel(selectorNb: number, label: string): void;
        /** @hidden */
        _setSelectorLabelColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonBackground(selectorNb: number, color: string): void;
    }
    /** Class used to hold the controls for the checkboxes, radio buttons and sliders
     * @see https://doc.babylonjs.com/how_to/selector
    */
    export class SelectionPanel extends Rectangle {
        /** name of SelectionPanel */
        name: string;
        /** an array of SelectionGroups */
        groups: SelectorGroup[];
        private _panel;
        private _buttonColor;
        private _buttonBackground;
        private _headerColor;
        private _barColor;
        private _barHeight;
        private _spacerHeight;
        private _labelColor;
        private _groups;
        private _bars;
        /**
        * Creates a new SelectionPanel
        * @param name of SelectionPanel
        * @param groups is an array of SelectionGroups
        */
        constructor(
        /** name of SelectionPanel */
        name: string, 
        /** an array of SelectionGroups */
        groups?: SelectorGroup[]);
        protected _getTypeName(): string;
        /** Gets the (stack) panel of the SelectionPanel  */
        get panel(): StackPanel;
        /** Gets or sets the headerColor */
        get headerColor(): string;
        set headerColor(color: string);
        private _setHeaderColor;
        /** Gets or sets the button color */
        get buttonColor(): string;
        set buttonColor(color: string);
        private _setbuttonColor;
        /** Gets or sets the label color */
        get labelColor(): string;
        set labelColor(color: string);
        private _setLabelColor;
        /** Gets or sets the button background */
        get buttonBackground(): string;
        set buttonBackground(color: string);
        private _setButtonBackground;
        /** Gets or sets the color of separator bar */
        get barColor(): string;
        set barColor(color: string);
        private _setBarColor;
        /** Gets or sets the height of separator bar */
        get barHeight(): string;
        set barHeight(value: string);
        private _setBarHeight;
        /** Gets or sets the height of spacers*/
        get spacerHeight(): string;
        set spacerHeight(value: string);
        private _setSpacerHeight;
        /** Adds a bar between groups */
        private _addSpacer;
        /** Add a group to the selection panel
         * @param group is the selector group to add
         */
        addGroup(group: SelectorGroup): void;
        /** Remove the group from the given position
         * @param groupNb is the position of the group in the list
         */
        removeGroup(groupNb: number): void;
        /** Change a group header label
         * @param label is the new group header label
         * @param groupNb is the number of the group to relabel
         * */
        setHeaderName(label: string, groupNb: number): void;
        /** Change selector label to the one given
         * @param label is the new selector label
         * @param groupNb is the number of the groupcontaining the selector
         * @param selectorNb is the number of the selector within a group to relabel
         * */
        relabel(label: string, groupNb: number, selectorNb: number): void;
        /** For a given group position remove the selector at the given position
         * @param groupNb is the number of the group to remove the selector from
         * @param selectorNb is the number of the selector within the group
         */
        removeFromGroupSelector(groupNb: number, selectorNb: number): void;
        /** For a given group position of correct type add a checkbox button
         * @param groupNb is the number of the group to remove the selector from
         * @param label is the label for the selector
         * @param func is the function called when the Selector is checked
         * @param checked is true when Selector is checked
         */
        addToGroupCheckbox(groupNb: number, label: string, func?: () => void, checked?: boolean): void;
        /** For a given group position of correct type add a radio button
         * @param groupNb is the number of the group to remove the selector from
         * @param label is the label for the selector
         * @param func is the function called when the Selector is checked
         * @param checked is true when Selector is checked
         */
        addToGroupRadio(groupNb: number, label: string, func?: () => void, checked?: boolean): void;
        /**
         * For a given slider group add a slider
         * @param groupNb is the number of the group to add the slider to
         * @param label is the label for the Slider
         * @param func is the function called when the Slider moves
         * @param unit is a string describing the units used, eg degrees or metres
         * @param min is the minimum value for the Slider
         * @param max is the maximum value for the Slider
         * @param value is the start value for the Slider between min and max
         * @param onVal is the function used to format the value displayed, eg radians to degrees
         */
        addToGroupSlider(groupNb: number, label: string, func?: () => void, unit?: string, min?: number, max?: number, value?: number, onVal?: (v: number) => number): void;
    }
}
declare module "babylonjs-gui/2D/controls/scrollViewers/scrollViewerWindow" {
    import { Measure } from "babylonjs-gui/2D/measure";
    import { Container } from "babylonjs-gui/2D/controls/container";
    /**
     * Class used to hold a the container for ScrollViewer
     * @hidden
    */
    export class _ScrollViewerWindow extends Container {
        parentClientWidth: number;
        parentClientHeight: number;
        private _freezeControls;
        private _parentMeasure;
        private _oldLeft;
        private _oldTop;
        get freezeControls(): boolean;
        set freezeControls(value: boolean);
        private _bucketWidth;
        private _bucketHeight;
        private _buckets;
        private _bucketLen;
        get bucketWidth(): number;
        get bucketHeight(): number;
        setBucketSizes(width: number, height: number): void;
        private _useBuckets;
        private _makeBuckets;
        private _dispatchInBuckets;
        private _updateMeasures;
        private _updateChildrenMeasures;
        private _restoreMeasures;
        /**
        * Creates a new ScrollViewerWindow
        * @param name of ScrollViewerWindow
        */
        constructor(name?: string);
        protected _getTypeName(): string;
        /** @hidden */
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /** @hidden */
        _layout(parentMeasure: Measure, context: CanvasRenderingContext2D): boolean;
        private _scrollChildren;
        private _scrollChildrenWithBuckets;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Measure): void;
        protected _postMeasure(): void;
    }
}
declare module "babylonjs-gui/2D/controls/sliders/scrollBar" {
    import { Vector2 } from "babylonjs/Maths/math.vector";
    import { BaseSlider } from "babylonjs-gui/2D/controls/sliders/baseSlider";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { PointerInfoBase } from 'babylonjs/Events/pointerEvents';
    /**
     * Class used to create slider controls
     */
    export class ScrollBar extends BaseSlider {
        name?: string | undefined;
        private _background;
        private _borderColor;
        private _tempMeasure;
        /** Gets or sets border color */
        get borderColor(): string;
        set borderColor(value: string);
        /** Gets or sets background color */
        get background(): string;
        set background(value: string);
        /**
         * Creates a new Slider
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _getThumbThickness(): number;
        _draw(context: CanvasRenderingContext2D): void;
        private _first;
        private _originX;
        private _originY;
        /** @hidden */
        protected _updateValueFromPointer(x: number, y: number): void;
        _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
    }
}
declare module "babylonjs-gui/2D/controls/sliders/imageScrollBar" {
    import { Vector2 } from "babylonjs/Maths/math.vector";
    import { BaseSlider } from "babylonjs-gui/2D/controls/sliders/baseSlider";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { Image } from "babylonjs-gui/2D/controls/image";
    import { PointerInfoBase } from 'babylonjs/Events/pointerEvents';
    /**
     * Class used to create slider controls
     */
    export class ImageScrollBar extends BaseSlider {
        name?: string | undefined;
        private _backgroundBaseImage;
        private _backgroundImage;
        private _thumbImage;
        private _thumbBaseImage;
        private _thumbLength;
        private _thumbHeight;
        private _barImageHeight;
        private _tempMeasure;
        /** Number of 90° rotation to apply on the images when in vertical mode */
        num90RotationInVerticalMode: number;
        /**
         * Gets or sets the image used to render the background for horizontal bar
         */
        get backgroundImage(): Image;
        set backgroundImage(value: Image);
        /**
         * Gets or sets the image used to render the thumb
         */
        get thumbImage(): Image;
        set thumbImage(value: Image);
        /**
         * Gets or sets the length of the thumb
         */
        get thumbLength(): number;
        set thumbLength(value: number);
        /**
         * Gets or sets the height of the thumb
         */
        get thumbHeight(): number;
        set thumbHeight(value: number);
        /**
         * Gets or sets the height of the bar image
         */
        get barImageHeight(): number;
        set barImageHeight(value: number);
        /**
         * Creates a new ImageScrollBar
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _getThumbThickness(): number;
        _draw(context: CanvasRenderingContext2D): void;
        private _first;
        private _originX;
        private _originY;
        /** @hidden */
        protected _updateValueFromPointer(x: number, y: number): void;
        _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
    }
}
declare module "babylonjs-gui/2D/controls/scrollViewers/scrollViewer" {
    import { Nullable } from "babylonjs/types";
    import { Rectangle } from "babylonjs-gui/2D/controls/rectangle";
    import { Image } from "babylonjs-gui/2D/controls/image";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { Container } from "babylonjs-gui/2D/controls/container";
    import { Measure } from "babylonjs-gui/2D/measure";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    import { ScrollBar } from "babylonjs-gui/2D/controls/sliders/scrollBar";
    import { ImageScrollBar } from "babylonjs-gui/2D/controls/sliders/imageScrollBar";
    /**
     * Class used to hold a viewer window and sliders in a grid
    */
    export class ScrollViewer extends Rectangle {
        private _grid;
        private _horizontalBarSpace;
        private _verticalBarSpace;
        private _dragSpace;
        private _horizontalBar;
        private _verticalBar;
        private _barColor;
        private _barBackground;
        private _barImage;
        private _horizontalBarImage;
        private _verticalBarImage;
        private _barBackgroundImage;
        private _horizontalBarBackgroundImage;
        private _verticalBarBackgroundImage;
        private _barSize;
        private _window;
        private _pointerIsOver;
        private _wheelPrecision;
        private _onWheelObserver;
        private _clientWidth;
        private _clientHeight;
        private _useImageBar;
        private _thumbLength;
        private _thumbHeight;
        private _barImageHeight;
        private _horizontalBarImageHeight;
        private _verticalBarImageHeight;
        private _oldWindowContentsWidth;
        private _oldWindowContentsHeight;
        /**
         * Gets the horizontal scrollbar
         */
        get horizontalBar(): ScrollBar | ImageScrollBar;
        /**
         * Gets the vertical scrollbar
         */
        get verticalBar(): ScrollBar | ImageScrollBar;
        /**
         * Adds a new control to the current container
         * @param control defines the control to add
         * @returns the current container
         */
        addControl(control: Nullable<Control>): Container;
        /**
         * Removes a control from the current container
         * @param control defines the control to remove
         * @returns the current container
         */
        removeControl(control: Control): Container;
        /** Gets the list of children */
        get children(): Control[];
        _flagDescendantsAsMatrixDirty(): void;
        /**
         * Freezes or unfreezes the controls in the window.
         * When controls are frozen, the scroll viewer can render a lot more quickly but updates to positions/sizes of controls
         * are not taken into account. If you want to change positions/sizes, unfreeze, perform the changes then freeze again
         */
        get freezeControls(): boolean;
        set freezeControls(value: boolean);
        /** Gets the bucket width */
        get bucketWidth(): number;
        /** Gets the bucket height */
        get bucketHeight(): number;
        /**
         * Sets the bucket sizes.
         * When freezeControls is true, setting a non-zero bucket size will improve performances by updating only
         * controls that are visible. The bucket sizes is used to subdivide (internally) the window area to smaller areas into which
         * controls are dispatched. So, the size should be roughly equals to the mean size of all the controls of
         * the window. To disable the usage of buckets, sets either width or height (or both) to 0.
         * Please note that using this option will raise the memory usage (the higher the bucket sizes, the less memory
         * used), that's why it is not enabled by default.
         * @param width width of the bucket
         * @param height height of the bucket
         */
        setBucketSizes(width: number, height: number): void;
        private _forceHorizontalBar;
        private _forceVerticalBar;
        /**
         * Forces the horizontal scroll bar to be displayed
         */
        get forceHorizontalBar(): boolean;
        set forceHorizontalBar(value: boolean);
        /**
         * Forces the vertical scroll bar to be displayed
         */
        get forceVerticalBar(): boolean;
        set forceVerticalBar(value: boolean);
        /**
        * Creates a new ScrollViewer
        * @param name of ScrollViewer
        */
        constructor(name?: string, isImageBased?: boolean);
        /** Reset the scroll viewer window to initial size */
        resetWindow(): void;
        protected _getTypeName(): string;
        private _buildClientSizes;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        protected _postMeasure(): void;
        /**
         * Gets or sets the mouse wheel precision
         * from 0 to 1 with a default value of 0.05
         * */
        get wheelPrecision(): number;
        set wheelPrecision(value: number);
        /** Gets or sets the scroll bar container background color */
        get scrollBackground(): string;
        set scrollBackground(color: string);
        /** Gets or sets the bar color */
        get barColor(): string;
        set barColor(color: string);
        /** Gets or sets the bar image */
        get thumbImage(): Image;
        set thumbImage(value: Image);
        /** Gets or sets the horizontal bar image */
        get horizontalThumbImage(): Image;
        set horizontalThumbImage(value: Image);
        /** Gets or sets the vertical bar image */
        get verticalThumbImage(): Image;
        set verticalThumbImage(value: Image);
        /** Gets or sets the size of the bar */
        get barSize(): number;
        set barSize(value: number);
        /** Gets or sets the length of the thumb */
        get thumbLength(): number;
        set thumbLength(value: number);
        /** Gets or sets the height of the thumb */
        get thumbHeight(): number;
        set thumbHeight(value: number);
        /** Gets or sets the height of the bar image */
        get barImageHeight(): number;
        set barImageHeight(value: number);
        /** Gets or sets the height of the horizontal bar image */
        get horizontalBarImageHeight(): number;
        set horizontalBarImageHeight(value: number);
        /** Gets or sets the height of the vertical bar image */
        get verticalBarImageHeight(): number;
        set verticalBarImageHeight(value: number);
        /** Gets or sets the bar background */
        get barBackground(): string;
        set barBackground(color: string);
        /** Gets or sets the bar background image */
        get barImage(): Image;
        set barImage(value: Image);
        /** Gets or sets the horizontal bar background image */
        get horizontalBarImage(): Image;
        set horizontalBarImage(value: Image);
        /** Gets or sets the vertical bar background image */
        get verticalBarImage(): Image;
        set verticalBarImage(value: Image);
        private _setWindowPosition;
        /** @hidden */
        private _updateScroller;
        _link(host: AdvancedDynamicTexture): void;
        /** @hidden */
        private _addBar;
        /** @hidden */
        private _attachWheel;
        _renderHighlightSpecific(context: CanvasRenderingContext2D): void;
        /** Releases associated resources */
        dispose(): void;
    }
}
declare module "babylonjs-gui/2D/controls/toggleButton" {
    import { Nullable } from "babylonjs/types";
    import { Observable } from "babylonjs/Misc/observable";
    import { Vector2 } from "babylonjs/Maths/math.vector";
    import { Rectangle } from "babylonjs-gui/2D/controls/rectangle";
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { TextBlock } from "babylonjs-gui/2D/controls/textBlock";
    import { Image } from "babylonjs-gui/2D/controls/image";
    import { PointerInfoBase } from "babylonjs/Events/pointerEvents";
    /**
     * Class used to create toggle buttons
     */
    export class ToggleButton extends Rectangle {
        name?: string | undefined;
        /**
         * Function called to generate the toActive animation
         */
        toActiveAnimation: () => void;
        /**
         * Function called to generate the toInactive animation
         */
        toInactiveAnimation: () => void;
        /**
         * Function called to generate a pointer enter animation when the toggle button is active.
         */
        pointerEnterActiveAnimation: () => void;
        /**
         * Function called to generate a pointer out animation when the toggle button is active.
         */
        pointerOutActiveAnimation: () => void;
        /**
         * Function called to generate a pointer down animation when the toggle button is active.
         */
        pointerDownActiveAnimation: () => void;
        /**
         * Function called to generate a pointer up animation when the toggle button is active.
         */
        pointerUpActiveAnimation: () => void;
        /**
         * Function called to generate a pointer enter animation when the toggle button is inactive.
         */
        pointerEnterInactiveAnimation: () => void;
        /**
         * Function called to generate a pointer out animation when the toggle button is inactive.
         */
        pointerOutInactiveAnimation: () => void;
        /**
         * Function called to generate a pointer down animation when the toggle button is inactive.
         */
        pointerDownInactiveAnimation: () => void;
        /**
         * Function called to generate a pointer up animation when the toggle button is inactive.
         */
        pointerUpInactiveAnimation: () => void;
        /** Observable raised when isActive is changed */
        onIsActiveChangedObservable: Observable<boolean>;
        /**
         * Gets or sets a boolean indicating that the toggle button will let internal controls handle picking instead of doing it directly using its bounding info
         */
        delegatePickingToChildren: boolean;
        private _image;
        /**
         * Returns the ToggleButton's image control if it exists
         */
        get image(): Nullable<Image>;
        private _textBlock;
        /**
         * Returns the ToggleButton's child TextBlock control if it exists
         */
        get textBlock(): Nullable<TextBlock>;
        private _group;
        /** Gets or sets group name this toggle button belongs to */
        get group(): string;
        set group(value: string);
        private _isActive;
        /** Gets or sets a boolean indicating if the toogle button is active or not */
        get isActive(): boolean;
        set isActive(value: boolean);
        /**
         * Creates a new ToggleButton
         * @param name defines the control name
         * @param group defines the toggle group this toggle belongs to
         */
        constructor(name?: string | undefined, group?: string);
        protected _getTypeName(): string;
        /** @hidden */
        _processPicking(x: number, y: number, pi: PointerInfoBase, type: number, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
        /** @hidden */
        _onPointerEnter(target: Control, pi: PointerInfoBase): boolean;
        /** @hidden */
        _onPointerOut(target: Control, pi: PointerInfoBase, force?: boolean): void;
        /** @hidden */
        _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
        /** @hidden */
        _onPointerUp(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi: PointerInfoBase): void;
    }
}
declare module "babylonjs-gui/2D/controls/displayGrid" {
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { Nullable } from 'babylonjs/types';
    import { Measure } from "babylonjs-gui/2D/measure";
    /** Class used to render a grid  */
    export class DisplayGrid extends Control {
        name?: string | undefined;
        private _cellWidth;
        private _cellHeight;
        private _minorLineTickness;
        private _minorLineColor;
        private _majorLineTickness;
        private _majorLineColor;
        private _majorLineFrequency;
        private _background;
        private _displayMajorLines;
        private _displayMinorLines;
        /** Gets or sets a boolean indicating if minor lines must be rendered (true by default)) */
        get displayMinorLines(): boolean;
        set displayMinorLines(value: boolean);
        /** Gets or sets a boolean indicating if major lines must be rendered (true by default)) */
        get displayMajorLines(): boolean;
        set displayMajorLines(value: boolean);
        /** Gets or sets background color (Black by default) */
        get background(): string;
        set background(value: string);
        /** Gets or sets the width of each cell (20 by default) */
        get cellWidth(): number;
        set cellWidth(value: number);
        /** Gets or sets the height of each cell (20 by default) */
        get cellHeight(): number;
        set cellHeight(value: number);
        /** Gets or sets the tickness of minor lines (1 by default) */
        get minorLineTickness(): number;
        set minorLineTickness(value: number);
        /** Gets or sets the color of minor lines (DarkGray by default) */
        get minorLineColor(): string;
        set minorLineColor(value: string);
        /** Gets or sets the tickness of major lines (2 by default) */
        get majorLineTickness(): number;
        set majorLineTickness(value: number);
        /** Gets or sets the color of major lines (White by default) */
        get majorLineColor(): string;
        set majorLineColor(value: string);
        /** Gets or sets the frequency of major lines (default is 1 every 5 minor lines)*/
        get majorLineFrequency(): number;
        set majorLineFrequency(value: number);
        /**
         * Creates a new GridDisplayRectangle
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Nullable<Measure>): void;
        protected _getTypeName(): string;
    }
}
declare module "babylonjs-gui/2D/controls/sliders/imageBasedSlider" {
    import { BaseSlider } from "babylonjs-gui/2D/controls/sliders/baseSlider";
    import { Measure } from "babylonjs-gui/2D/measure";
    import { Image } from "babylonjs-gui/2D/controls/image";
    import { Nullable } from 'babylonjs/types';
    /**
     * Class used to create slider controls based on images
     */
    export class ImageBasedSlider extends BaseSlider {
        name?: string | undefined;
        private _backgroundImage;
        private _thumbImage;
        private _valueBarImage;
        private _tempMeasure;
        get displayThumb(): boolean;
        set displayThumb(value: boolean);
        /**
         * Gets or sets the image used to render the background
         */
        get backgroundImage(): Image;
        set backgroundImage(value: Image);
        /**
         * Gets or sets the image used to render the value bar
         */
        get valueBarImage(): Image;
        set valueBarImage(value: Image);
        /**
         * Gets or sets the image used to render the thumb
         */
        get thumbImage(): Image;
        set thumbImage(value: Image);
        /**
         * Creates a new ImageBasedSlider
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Nullable<Measure>): void;
    }
}
declare module "babylonjs-gui/2D/controls/statics" {
    /**
     * Forcing an export so that this code will execute
     * @hidden
     */
    const name = "Statics";
    export { name };
}
declare module "babylonjs-gui/2D/controls/index" {
    export * from "babylonjs-gui/2D/controls/button";
    export * from "babylonjs-gui/2D/controls/checkbox";
    export * from "babylonjs-gui/2D/controls/colorpicker";
    export * from "babylonjs-gui/2D/controls/container";
    export * from "babylonjs-gui/2D/controls/control";
    export * from "babylonjs-gui/2D/controls/ellipse";
    export * from "babylonjs-gui/2D/controls/focusableButton";
    export * from "babylonjs-gui/2D/controls/grid";
    export * from "babylonjs-gui/2D/controls/image";
    export * from "babylonjs-gui/2D/controls/inputText";
    export * from "babylonjs-gui/2D/controls/inputPassword";
    export * from "babylonjs-gui/2D/controls/line";
    export * from "babylonjs-gui/2D/controls/multiLine";
    export * from "babylonjs-gui/2D/controls/radioButton";
    export * from "babylonjs-gui/2D/controls/stackPanel";
    export * from "babylonjs-gui/2D/controls/selector";
    export * from "babylonjs-gui/2D/controls/scrollViewers/scrollViewer";
    export * from "babylonjs-gui/2D/controls/textBlock";
    export * from "babylonjs-gui/2D/controls/textWrapper";
    export * from "babylonjs-gui/2D/controls/toggleButton";
    export * from "babylonjs-gui/2D/controls/virtualKeyboard";
    export * from "babylonjs-gui/2D/controls/rectangle";
    export * from "babylonjs-gui/2D/controls/displayGrid";
    export * from "babylonjs-gui/2D/controls/sliders/baseSlider";
    export * from "babylonjs-gui/2D/controls/sliders/slider";
    export * from "babylonjs-gui/2D/controls/sliders/imageBasedSlider";
    export * from "babylonjs-gui/2D/controls/sliders/scrollBar";
    export * from "babylonjs-gui/2D/controls/sliders/imageScrollBar";
    export * from "babylonjs-gui/2D/controls/statics";
}
declare module "babylonjs-gui/2D/adtInstrumentation" {
    import { PerfCounter } from "babylonjs/Misc/perfCounter";
    import { IDisposable } from "babylonjs/scene";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    /**
     * This class can be used to get instrumentation data from a AdvancedDynamicTexture object
     */
    export class AdvancedDynamicTextureInstrumentation implements IDisposable {
        /**
         * Define the instrumented AdvancedDynamicTexture.
         */
        texture: AdvancedDynamicTexture;
        private _captureRenderTime;
        private _renderTime;
        private _captureLayoutTime;
        private _layoutTime;
        private _onBeginRenderObserver;
        private _onEndRenderObserver;
        private _onBeginLayoutObserver;
        private _onEndLayoutObserver;
        /**
         * Gets the perf counter used to capture render time
         */
        get renderTimeCounter(): PerfCounter;
        /**
         * Gets the perf counter used to capture layout time
         */
        get layoutTimeCounter(): PerfCounter;
        /**
         * Enable or disable the render time capture
         */
        get captureRenderTime(): boolean;
        set captureRenderTime(value: boolean);
        /**
         * Enable or disable the layout time capture
         */
        get captureLayoutTime(): boolean;
        set captureLayoutTime(value: boolean);
        /**
         * Instantiates a new advanced dynamic texture instrumentation.
         * This class can be used to get instrumentation data from an AdvancedDynamicTexture object
         * @param texture Defines the AdvancedDynamicTexture to instrument
         */
        constructor(
        /**
         * Define the instrumented AdvancedDynamicTexture.
         */
        texture: AdvancedDynamicTexture);
        /**
         * Dispose and release associated resources.
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/2D/xmlLoader" {
    /**
    * Class used to load GUI via XML.
    */
    export class XmlLoader {
        private _nodes;
        private _nodeTypes;
        private _isLoaded;
        private _objectAttributes;
        private _parentClass;
        /**
        * Create a new xml loader
        * @param parentClass Sets the class context. Used when the loader is instanced inside a class and not in a global context
        */
        constructor(parentClass?: null);
        private _getChainElement;
        private _getClassAttribute;
        private _createGuiElement;
        private _parseGrid;
        private _parseElement;
        private _prepareSourceElement;
        private _parseElementsFromSource;
        private _parseXml;
        /**
         * Gets if the loading has finished.
         * @returns whether the loading has finished or not
        */
        isLoaded(): boolean;
        /**
         * Gets a loaded node / control by id.
         * @param id the Controls id set in the xml
         * @returns element of type Control
        */
        getNodeById(id: string): any;
        /**
         * Gets all loaded nodes / controls
         * @returns Array of controls
        */
        getNodes(): any;
        /**
         * Initiates the xml layout loading
         * @param xmlFile defines the xml layout to load
         * @param rootNode defines the node / control to use as a parent for the loaded layout controls.
         * @param callback defines the callback called on layout load.
         */
        loadLayout(xmlFile: any, rootNode: any, callback: any): void;
    }
}
declare module "babylonjs-gui/2D/index" {
    export * from "babylonjs-gui/2D/controls/index";
    export * from "babylonjs-gui/2D/advancedDynamicTexture";
    export * from "babylonjs-gui/2D/adtInstrumentation";
    export * from "babylonjs-gui/2D/math2D";
    export * from "babylonjs-gui/2D/measure";
    export * from "babylonjs-gui/2D/multiLinePoint";
    export * from "babylonjs-gui/2D/style";
    export * from "babylonjs-gui/2D/valueAndUnit";
    export * from "babylonjs-gui/2D/xmlLoader";
}
declare module "babylonjs-gui/3D/controls/container3D" {
    import { Nullable } from "babylonjs/types";
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { Scene } from "babylonjs/scene";
    import { Control3D } from "babylonjs-gui/3D/controls/control3D";
    /**
     * Class used to create containers for controls
     */
    export class Container3D extends Control3D {
        private _blockLayout;
        /**
         * Gets the list of child controls
         */
        protected _children: Control3D[];
        /**
         * Gets the list of child controls
         */
        get children(): Array<Control3D>;
        /**
         * Gets or sets a boolean indicating if the layout must be blocked (default is false).
         * This is helpful to optimize layout operation when adding multiple children in a row
         */
        get blockLayout(): boolean;
        set blockLayout(value: boolean);
        /**
         * Creates a new container
         * @param name defines the container name
         */
        constructor(name?: string);
        /**
         * Force the container to update the layout. Please note that it will not take blockLayout property in account
         * @returns the current container
         */
        updateLayout(): Container3D;
        /**
         * Gets a boolean indicating if the given control is in the children of this control
         * @param control defines the control to check
         * @returns true if the control is in the child list
         */
        containsControl(control: Control3D): boolean;
        /**
         * Adds a control to the children of this control
         * @param control defines the control to add
         * @returns the current container
         */
        addControl(control: Control3D): Container3D;
        /**
         * This function will be called everytime a new control is added
         */
        protected _arrangeChildren(): void;
        protected _createNode(scene: Scene): Nullable<TransformNode>;
        /**
         * Removes a control from the children of this control
         * @param control defines the control to remove
         * @returns the current container
         */
        removeControl(control: Control3D): Container3D;
        protected _getTypeName(): string;
        /**
         * Releases all associated resources
         */
        dispose(): void;
        /** Control rotation will remain unchanged  */
        static readonly UNSET_ORIENTATION: number;
        /** Control will rotate to make it look at sphere central axis */
        static readonly FACEORIGIN_ORIENTATION: number;
        /** Control will rotate to make it look back at sphere central axis */
        static readonly FACEORIGINREVERSED_ORIENTATION: number;
        /** Control will rotate to look at z axis (0, 0, 1) */
        static readonly FACEFORWARD_ORIENTATION: number;
        /** Control will rotate to look at negative z axis (0, 0, -1) */
        static readonly FACEFORWARDREVERSED_ORIENTATION: number;
    }
}
declare module "babylonjs-gui/3D/controls/button3D" {
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { Material } from "babylonjs/Materials/material";
    import { Scene } from "babylonjs/scene";
    import { AbstractButton3D } from "babylonjs-gui/3D/controls/abstractButton3D";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    /**
     * Class used to create a button in 3D
     */
    export class Button3D extends AbstractButton3D {
        /** @hidden */
        protected _currentMaterial: Material;
        /**
         * Creates a new button
         * @param name defines the control name
         */
        constructor(name?: string);
        /**
         * Apply the facade texture (created from the content property).
         * @param facadeTexture defines the AdvancedDynamicTexture to use
         */
        protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
        protected _getTypeName(): string;
        protected _createNode(scene: Scene): TransformNode;
        protected _affectMaterial(mesh: AbstractMesh): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/controls/touchButton3D" {
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { Scene } from "babylonjs/scene";
    import { Button3D } from "babylonjs-gui/3D/controls/button3D";
    /**
     * Enum for Button States
     */
    /** @hidden */
    export enum ButtonState {
        /** None */
        None = 0,
        /** Pointer Entered */
        Hover = 1,
        /** Pointer Down */
        Press = 2
    }
    /**
     * Class used to create a touchable button in 3D
     */
    export class TouchButton3D extends Button3D {
        private _collisionMesh;
        private _collidableFrontDirection;
        private _lastTouchPoint;
        private _tempButtonForwardRay;
        private _lastKnownCollidableScale;
        private _collidableInitialized;
        private _frontOffset;
        private _backOffset;
        private _hoverOffset;
        private _pushThroughBackOffset;
        private _activeInteractions;
        private _previousHeight;
        /**
         * Creates a new touchable button
         * @param name defines the control name
         * @param collisionMesh mesh to track collisions with
         */
        constructor(name?: string, collisionMesh?: Mesh);
        /**
         * Sets the front-facing direction of the button
         * @param frontDir the forward direction of the button
         */
        set collidableFrontDirection(frontWorldDir: Vector3);
        private _getWorldMatrixData;
        /**
         * Sets the mesh used for testing input collision
         * @param collisionMesh the new collision mesh for the button
         */
        set collisionMesh(collisionMesh: Mesh);
        private _getShortestDistancePointToLine;
        private _isPrimedForInteraction;
        private _getPointOnButton;
        private _updateDistanceOffsets;
        private _getHeightFromButtonCenter;
        private _getDistanceOffPlane;
        private _updateButtonState;
        private _firePointerEvents;
        /** @hidden */
        _collisionCheckForStateChange(meshPos: Vector3, uniqueId: number, forceExit?: boolean): void;
        protected _getTypeName(): string;
        protected _createNode(scene: Scene): TransformNode;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/gui3DManager" {
    import { Nullable } from "babylonjs/types";
    import { Observable } from "babylonjs/Misc/observable";
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { Material } from "babylonjs/Materials/material";
    import { UtilityLayerRenderer } from "babylonjs/Rendering/utilityLayerRenderer";
    import { IDisposable, Scene } from "babylonjs/scene";
    import { Container3D } from "babylonjs-gui/3D/controls/container3D";
    import { Control3D } from "babylonjs-gui/3D/controls/control3D";
    /**
     * Class used to manage 3D user interface
     * @see https://doc.babylonjs.com/how_to/gui3d
     */
    export class GUI3DManager implements IDisposable {
        private _scene;
        private _sceneDisposeObserver;
        private _utilityLayer;
        private _rootContainer;
        private _pointerObserver;
        private _pointerOutObserver;
        private _touchableButtons;
        private _touchIds;
        private static _touchIdCounter;
        /** @hidden */
        _lastPickedControl: Control3D;
        /** @hidden */
        _lastControlOver: {
            [pointerId: number]: Control3D;
        };
        /** @hidden */
        _lastControlDown: {
            [pointerId: number]: Control3D;
        };
        /**
         * Observable raised when the point picked by the pointer events changed
         */
        onPickedPointChangedObservable: Observable<Nullable<Vector3>>;
        /** @hidden */
        _sharedMaterials: {
            [key: string]: Material;
        };
        /** @hidden */
        _touchSharedMaterials: {
            [key: string]: Material;
        };
        /** Gets the hosting scene */
        get scene(): Scene;
        /** Gets associated utility layer */
        get utilityLayer(): Nullable<UtilityLayerRenderer>;
        /**
         * Creates a new GUI3DManager
         * @param scene
         */
        constructor(scene?: Scene);
        private _handlePointerOut;
        private _doPicking;
        private _processTouchControls;
        /**
         * Gets the root container
         */
        get rootContainer(): Container3D;
        /**
         * Gets a boolean indicating if the given control is in the root child list
         * @param control defines the control to check
         * @returns true if the control is in the root child list
         */
        containsControl(control: Control3D): boolean;
        /**
         * Adds a control to the root child list
         * @param control defines the control to add
         * @returns the current manager
         */
        addControl(control: Control3D): GUI3DManager;
        /**
         * Removes a control from the root child list
         * @param control defines the control to remove
         * @returns the current container
         */
        removeControl(control: Control3D): GUI3DManager;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/vector3WithInfo" {
    import { Vector3 } from "babylonjs/Maths/math.vector";
    /**
     * Class used to transport Vector3 information for pointer events
     */
    export class Vector3WithInfo extends Vector3 {
        /** defines the current mouse button index */
        buttonIndex: number;
        /**
         * Creates a new Vector3WithInfo
         * @param source defines the vector3 data to transport
         * @param buttonIndex defines the current mouse button index
         */
        constructor(source: Vector3, 
        /** defines the current mouse button index */
        buttonIndex?: number);
    }
}
declare module "babylonjs-gui/3D/controls/control3D" {
    import { Nullable } from "babylonjs/types";
    import { Observable } from "babylonjs/Misc/observable";
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { IBehaviorAware, Behavior } from "babylonjs/Behaviors/behavior";
    import { IDisposable, Scene } from "babylonjs/scene";
    import { GUI3DManager } from "babylonjs-gui/3D/gui3DManager";
    import { Vector3WithInfo } from "babylonjs-gui/3D/vector3WithInfo";
    import { Container3D } from "babylonjs-gui/3D/controls/container3D";
    /**
     * Class used as base class for controls
     */
    export class Control3D implements IDisposable, IBehaviorAware<Control3D> {
        /** Defines the control name */
        name?: string | undefined;
        /** @hidden */
        _host: GUI3DManager;
        private _node;
        private _downCount;
        private _enterCount;
        private _downPointerIds;
        private _isVisible;
        /** Gets or sets the control position  in world space */
        get position(): Vector3;
        set position(value: Vector3);
        /** Gets or sets the control scaling  in world space */
        get scaling(): Vector3;
        set scaling(value: Vector3);
        /** Callback used to start pointer enter animation */
        pointerEnterAnimation: () => void;
        /** Callback used to start pointer out animation */
        pointerOutAnimation: () => void;
        /** Callback used to start pointer down animation */
        pointerDownAnimation: () => void;
        /** Callback used to start pointer up animation */
        pointerUpAnimation: () => void;
        /**
         * An event triggered when the pointer move over the control
         */
        onPointerMoveObservable: Observable<Vector3>;
        /**
         * An event triggered when the pointer move out of the control
         */
        onPointerOutObservable: Observable<Control3D>;
        /**
         * An event triggered when the pointer taps the control
         */
        onPointerDownObservable: Observable<Vector3WithInfo>;
        /**
         * An event triggered when pointer is up
         */
        onPointerUpObservable: Observable<Vector3WithInfo>;
        /**
         * An event triggered when a control is clicked on (with a mouse)
         */
        onPointerClickObservable: Observable<Vector3WithInfo>;
        /**
         * An event triggered when pointer enters the control
         */
        onPointerEnterObservable: Observable<Control3D>;
        /**
         * Gets or sets the parent container
         */
        parent: Nullable<Container3D>;
        private _behaviors;
        /**
         * Gets the list of attached behaviors
         * @see https://doc.babylonjs.com/features/behaviour
         */
        get behaviors(): Behavior<Control3D>[];
        /**
         * Attach a behavior to the control
         * @see https://doc.babylonjs.com/features/behaviour
         * @param behavior defines the behavior to attach
         * @returns the current control
         */
        addBehavior(behavior: Behavior<Control3D>): Control3D;
        /**
         * Remove an attached behavior
         * @see https://doc.babylonjs.com/features/behaviour
         * @param behavior defines the behavior to attach
         * @returns the current control
         */
        removeBehavior(behavior: Behavior<Control3D>): Control3D;
        /**
         * Gets an attached behavior by name
         * @param name defines the name of the behavior to look for
         * @see https://doc.babylonjs.com/features/behaviour
         * @returns null if behavior was not found else the requested behavior
         */
        getBehaviorByName(name: string): Nullable<Behavior<Control3D>>;
        /** Gets or sets a boolean indicating if the control is visible */
        get isVisible(): boolean;
        set isVisible(value: boolean);
        /**
         * Creates a new control
         * @param name defines the control name
         */
        constructor(
        /** Defines the control name */
        name?: string | undefined);
        /**
         * Gets a string representing the class name
         */
        get typeName(): string;
        /**
         * Get the current class name of the control.
         * @returns current class name
         */
        getClassName(): string;
        protected _getTypeName(): string;
        /**
         * Gets the transform node used by this control
         */
        get node(): Nullable<TransformNode>;
        /**
         * Gets the mesh used to render this control
         */
        get mesh(): Nullable<AbstractMesh>;
        /**
         * Link the control as child of the given node
         * @param node defines the node to link to. Use null to unlink the control
         * @returns the current control
         */
        linkToTransformNode(node: Nullable<TransformNode>): Control3D;
        /** @hidden **/
        _prepareNode(scene: Scene): void;
        protected _injectGUI3DReservedDataStore(node: TransformNode): any;
        /**
         * Node creation.
         * Can be overriden by children
         * @param scene defines the scene where the node must be attached
         * @returns the attached node or null if none. Must return a Mesh or AbstractMesh if there is an atttached visible object
         */
        protected _createNode(scene: Scene): Nullable<TransformNode>;
        /**
         * Affect a material to the given mesh
         * @param mesh defines the mesh which will represent the control
         */
        protected _affectMaterial(mesh: AbstractMesh): void;
        /** @hidden */
        _onPointerMove(target: Control3D, coordinates: Vector3): void;
        /** @hidden */
        _onPointerEnter(target: Control3D): boolean;
        /** @hidden */
        _onPointerOut(target: Control3D): void;
        /** @hidden */
        _onPointerDown(target: Control3D, coordinates: Vector3, pointerId: number, buttonIndex: number): boolean;
        /** @hidden */
        _onPointerUp(target: Control3D, coordinates: Vector3, pointerId: number, buttonIndex: number, notifyClick: boolean): void;
        /** @hidden */
        forcePointerUp(pointerId?: Nullable<number>): void;
        /** @hidden */
        _processObservables(type: number, pickedPoint: Vector3, pointerId: number, buttonIndex: number): boolean;
        /** @hidden */
        _disposeNode(): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/controls/contentDisplay3D" {
    import { Control } from "babylonjs-gui/2D/controls/control";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    import { Control3D } from "babylonjs-gui/3D/controls/control3D";
    /**
     * The base class for controls that display content
     */
    export class ContentDisplay3D extends Control3D {
        private _content;
        private _facadeTexture;
        protected _contentResolution: number;
        protected _contentScaleRatio: number;
        /**
         * Gets or sets the GUI 2D content used to display the button's facade
         */
        get content(): Control;
        set content(value: Control);
        /**
         * Gets or sets the texture resolution used to render content (512 by default)
         */
        get contentResolution(): number;
        set contentResolution(value: number);
        protected _disposeFacadeTexture(): void;
        protected _resetContent(): void;
        /**
         * Apply the facade texture (created from the content property).
         * This function can be overloaded by child classes
         * @param facadeTexture defines the AdvancedDynamicTexture to use
         */
        protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
    }
}
declare module "babylonjs-gui/3D/controls/abstractButton3D" {
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { Scene } from "babylonjs/scene";
    import { ContentDisplay3D } from "babylonjs-gui/3D/controls/contentDisplay3D";
    /**
     * Class used as a root to all buttons
     */
    export class AbstractButton3D extends ContentDisplay3D {
        /**
         * Creates a new button
         * @param name defines the control name
         */
        constructor(name?: string);
        protected _getTypeName(): string;
        protected _createNode(scene: Scene): TransformNode;
    }
}
declare module "babylonjs-gui/3D/controls/volumeBasedPanel" {
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { int } from "babylonjs/types";
    import { Container3D } from "babylonjs-gui/3D/controls/container3D";
    import { Control3D } from "babylonjs-gui/3D/controls/control3D";
    /**
     * Abstract class used to create a container panel deployed on the surface of a volume
     */
    export abstract class VolumeBasedPanel extends Container3D {
        private _columns;
        private _rows;
        private _rowThenColum;
        private _orientation;
        protected _cellWidth: number;
        protected _cellHeight: number;
        /**
         * Gets or sets the distance between elements
         */
        margin: number;
        /**
         * Gets or sets the orientation to apply to all controls (BABYLON.Container3D.FaceOriginReversedOrientation by default)
        * | Value | Type                                | Description |
        * | ----- | ----------------------------------- | ----------- |
        * | 0     | UNSET_ORIENTATION                   |  Control rotation will remain unchanged |
        * | 1     | FACEORIGIN_ORIENTATION              |  Control will rotate to make it look at sphere central axis |
        * | 2     | FACEORIGINREVERSED_ORIENTATION      |  Control will rotate to make it look back at sphere central axis |
        * | 3     | FACEFORWARD_ORIENTATION             |  Control will rotate to look at z axis (0, 0, 1) |
        * | 4     | FACEFORWARDREVERSED_ORIENTATION     |  Control will rotate to look at negative z axis (0, 0, -1) |
         */
        get orientation(): number;
        set orientation(value: number);
        /**
         * Gets or sets the number of columns requested (10 by default).
         * The panel will automatically compute the number of rows based on number of child controls.
         */
        get columns(): int;
        set columns(value: int);
        /**
         * Gets or sets a the number of rows requested.
         * The panel will automatically compute the number of columns based on number of child controls.
         */
        get rows(): int;
        set rows(value: int);
        /**
         * Creates new VolumeBasedPanel
         */
        constructor();
        protected _arrangeChildren(): void;
        /** Child classes must implement this function to provide correct control positioning */
        protected abstract _mapGridNode(control: Control3D, nodePosition: Vector3): void;
        /** Child classes can implement this function to provide additional processing */
        protected _finalProcessing(): void;
    }
}
declare module "babylonjs-gui/3D/controls/cylinderPanel" {
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { float } from "babylonjs/types";
    import { VolumeBasedPanel } from "babylonjs-gui/3D/controls/volumeBasedPanel";
    import { Control3D } from "babylonjs-gui/3D/controls/control3D";
    /**
     * Class used to create a container panel deployed on the surface of a cylinder
     */
    export class CylinderPanel extends VolumeBasedPanel {
        private _radius;
        /**
         * Gets or sets the radius of the cylinder where to project controls (5 by default)
         */
        get radius(): float;
        set radius(value: float);
        protected _mapGridNode(control: Control3D, nodePosition: Vector3): void;
        private _cylindricalMapping;
    }
}
declare module "babylonjs-gui/3D/materials/fluent/shaders/fluent.vertex" {
    /** @hidden */
    export var fluentVertexShader: {
        name: string;
        shader: string;
    };
}
declare module "babylonjs-gui/3D/materials/fluent/shaders/fluent.fragment" {
    /** @hidden */
    export var fluentPixelShader: {
        name: string;
        shader: string;
    };
}
declare module "babylonjs-gui/3D/materials/fluent/fluentMaterial" {
    import { Nullable } from "babylonjs/types";
    import { Vector3, Matrix } from "babylonjs/Maths/math.vector";
    import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
    import { MaterialDefines } from "babylonjs/Materials/materialDefines";
    import { PushMaterial } from "babylonjs/Materials/pushMaterial";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { SubMesh } from "babylonjs/Meshes/subMesh";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { Scene } from "babylonjs/scene";
    import { Color3, Color4 } from "babylonjs/Maths/math.color";
    import "babylonjs-gui/3D/materials/fluent/shaders/fluent.vertex";
    import "babylonjs-gui/3D/materials/fluent/shaders/fluent.fragment";
    /** @hidden */
    export class FluentMaterialDefines extends MaterialDefines {
        INNERGLOW: boolean;
        BORDER: boolean;
        HOVERLIGHT: boolean;
        TEXTURE: boolean;
        constructor();
    }
    /**
     * Class used to render controls with fluent desgin
     */
    export class FluentMaterial extends PushMaterial {
        /**
         * Gets or sets inner glow intensity. A value of 0 means no glow (default is 0.5)
         */
        innerGlowColorIntensity: number;
        /**
         * Gets or sets the inner glow color (white by default)
         */
        innerGlowColor: Color3;
        /**
         * Gets or sets the albedo color (Default is Color3(0.3, 0.35, 0.4))
         */
        albedoColor: Color3;
        /**
         * Gets or sets a boolean indicating if borders must be rendered (default is false)
         */
        renderBorders: boolean;
        /**
         * Gets or sets border width (default is 0.5)
         */
        borderWidth: number;
        /**
         * Gets or sets a value indicating the smoothing value applied to border edges (0.02 by default)
         */
        edgeSmoothingValue: number;
        /**
         * Gets or sets the minimum value that can be applied to border width (default is 0.1)
         */
        borderMinValue: number;
        /**
         * Gets or sets a boolean indicating if hover light must be rendered (default is false)
         */
        renderHoverLight: boolean;
        /**
         * Gets or sets the radius used to render the hover light (default is 1.0)
         */
        hoverRadius: number;
        /**
         * Gets or sets the color used to render the hover light (default is Color4(0.3, 0.3, 0.3, 1.0))
         */
        hoverColor: Color4;
        /**
         * Gets or sets the hover light position in world space (default is Vector3.Zero())
         */
        hoverPosition: Vector3;
        private _albedoTexture;
        /** Gets or sets the texture to use for albedo color */
        albedoTexture: Nullable<BaseTexture>;
        /**
         * Creates a new Fluent material
         * @param name defines the name of the material
         * @param scene defines the hosting scene
         */
        constructor(name: string, scene: Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        getActiveTextures(): BaseTexture[];
        hasTexture(texture: BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): FluentMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): FluentMaterial;
    }
}
declare module "babylonjs-gui/3D/controls/holographicButton" {
    import { Button3D } from "babylonjs-gui/3D/controls/button3D";
    import { Nullable } from "babylonjs/types";
    import { StandardMaterial } from "babylonjs/Materials/standardMaterial";
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { Scene } from "babylonjs/scene";
    import { FluentMaterial } from "babylonjs-gui/3D/materials/fluent/fluentMaterial";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    /**
     * Class used to create a holographic button in 3D
     */
    export class HolographicButton extends Button3D {
        private _backPlate;
        private _textPlate;
        private _frontPlate;
        private _text;
        private _imageUrl;
        private _shareMaterials;
        private _frontMaterial;
        private _backMaterial;
        private _plateMaterial;
        private _pickedPointObserver;
        private _tooltipFade;
        private _tooltipTextBlock;
        private _tooltipTexture;
        private _tooltipMesh;
        private _tooltipHoverObserver;
        private _tooltipOutObserver;
        private _disposeTooltip;
        /**
         * Rendering ground id of all the mesh in the button
         */
        set renderingGroupId(id: number);
        get renderingGroupId(): number;
        /**
         * Text to be displayed on the tooltip shown when hovering on the button. When set to null tooltip is disabled. (Default: null)
         */
        set tooltipText(text: Nullable<string>);
        get tooltipText(): Nullable<string>;
        /**
         * Gets or sets text for the button
         */
        get text(): string;
        set text(value: string);
        /**
         * Gets or sets the image url for the button
         */
        get imageUrl(): string;
        set imageUrl(value: string);
        /**
         * Gets the back material used by this button
         */
        get backMaterial(): FluentMaterial;
        /**
         * Gets the front material used by this button
         */
        get frontMaterial(): FluentMaterial;
        /**
         * Gets the plate material used by this button
         */
        get plateMaterial(): StandardMaterial;
        /**
         * Gets a boolean indicating if this button shares its material with other HolographicButtons
         */
        get shareMaterials(): boolean;
        /**
         * Creates a new button
         * @param name defines the control name
         */
        constructor(name?: string, shareMaterials?: boolean);
        protected _getTypeName(): string;
        private _rebuildContent;
        protected _createNode(scene: Scene): TransformNode;
        protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
        private _createBackMaterial;
        private _createFrontMaterial;
        private _createPlateMaterial;
        protected _affectMaterial(mesh: Mesh): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/materials/fluentButton/shaders/fluentButton.fragment" {
    /** @hidden */
    export var fluentButtonPixelShader: {
        name: string;
        shader: string;
    };
}
declare module "babylonjs-gui/3D/materials/fluentButton/shaders/fluentButton.vertex" {
    /** @hidden */
    export var fluentButtonVertexShader: {
        name: string;
        shader: string;
    };
}
declare module "babylonjs-gui/3D/materials/fluentButton/fluentButtonMaterial" {
    import { Nullable } from "babylonjs/types";
    import { Matrix, Vector3 } from "babylonjs/Maths/math.vector";
    import { IAnimatable } from "babylonjs/Animations/animatable.interface";
    import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
    import { PushMaterial } from "babylonjs/Materials/pushMaterial";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { SubMesh } from "babylonjs/Meshes/subMesh";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { Scene } from "babylonjs/scene";
    import { Color4 } from "babylonjs/Maths/math.color";
    import "babylonjs-gui/3D/materials/fluentButton/shaders/fluentButton.fragment";
    import "babylonjs-gui/3D/materials/fluentButton/shaders/fluentButton.vertex";
    /**
     * Class used to render square buttons with fluent desgin
     */
    export class FluentButtonMaterial extends PushMaterial {
        /**
         * URL pointing to the texture used to define the coloring for the fluent blob effect.
         */
        static BLOB_TEXTURE_URL: string;
        /**
         * Gets or sets the width of the glowing edge, relative to the scale of the button.
         * (Default is 4% of the height).
         */
        edgeWidth: number;
        /**
         * Gets or sets the color of the glowing edge.
         */
        edgeColor: Color4;
        /**
         * Gets or sets the maximum intensity of the proximity light.
         */
        proximityMaxIntensity: number;
        /**
         * Gets or sets the maximum distance for the proximity light (Default is 16mm).
         */
        proximityFarDistance: number;
        /**
         * Gets or sets the radius of the proximity light when near to the surface.
         */
        proximityNearRadius: number;
        /**
         * Gets or sets the anisotropy of the proximity light.
         */
        proximityAnisotropy: number;
        /**
         * Gets or sets the amount of fuzzing in the selection focus.
         */
        selectionFuzz: number;
        /**
         * Gets or sets an override value to display the button as selected.
         */
        selected: number;
        /**
         * Gets or sets a value to manually fade the blob size.
         */
        selectionFade: number;
        /**
         * Gets or sets a value to manually shrink the blob size as it fades (see selectionFade).
         */
        selectionFadeSize: number;
        /**
         * Gets or sets the distance from the button the cursor should be for the button
         * to appear selected (Default is 8cm).
         */
        selectedDistance: number;
        /**
         * Gets or sets the fall-off distance for the selection fade (Default is 8cm).
         */
        selectedFadeLength: number;
        /**
         * Gets or sets the intensity of the luminous blob (Ranges 0-1, default is 0.5).
         */
        blobIntensity: number;
        /**
         * The size of the blob when the pointer is at the blobFarDistance (Default is 5cm).
         */
        blobFarSize: number;
        /**
         * The distance at which the pointer is considered near. See [left|right]BlobNearSize. (Default is 0cm).
         */
        blobNearDistance: number;
        /**
         * The distance at which the pointer is considered far. See [left|right]BlobFarSize. (Default is 8cm).
         */
        blobFarDistance: number;
        /**
         * The distance over which the blob intensity fades from full to none (Default is 8cm).
         */
        blobFadeLength: number;
        /**
         * Gets or sets whether the blob corresponding to the left index finger is enabled.
         */
        leftBlobEnable: boolean;
        /**
         * Gets or sets the size of the left blob when the left pointer is considered near. See blobNearDistance. (Default is 2.5cm).
         */
        leftBlobNearSize: number;
        /**
         * Gets or sets the progress of the pulse animation on the left blob (Ranges 0-1).
         */
        leftBlobPulse: number;
        /**
         * Gets or sets the fade factor on the left blob.
         */
        leftBlobFade: number;
        /**
         * Gets or sets the inner fade on the left blob;
         */
        leftBlobInnerFade: number;
        /**
         * Gets or sets whether the blob corresponding to the right index finger is enabled.
         */
        rightBlobEnable: boolean;
        /**
         * Gets or sets the size of the right blob when the right pointer is considered near. See blobNearDistance. (Default is 2.5cm).
         */
        rightBlobNearSize: number;
        /**
         * Gets or sets the progress of the pulse animation on the right blob (Ranges 0-1).
         */
        rightBlobPulse: number;
        /**
         * Gets or sets the fade factor on the right blob.
         */
        rightBlobFade: number;
        /**
         * Gets or sets the inner fade on the right blob;
         */
        rightBlobInnerFade: number;
        /**
         * Gets or sets the direction of the active face before the world transform is applied.
         * This should almost always be set to -z.
         */
        activeFaceDir: Vector3;
        /**
         * Gets or sets the button's up direction before the world transform is applied.
         * This should almost always be set to +y.
         */
        activeFaceUp: Vector3;
        /**
         * Gets or sets whether the edge fade effect is enabled.
         */
        enableFade: boolean;
        /**
         * Gets or sets a value corresponding to the width of the edge fade effect (Default 1.5).
         */
        fadeWidth: number;
        /**
         * Gets or sets whether the active face is smoothly interpolated.
         */
        smoothActiveFace: boolean;
        /**
         * Gets or sets whether the frame of the fluent button model is visible.
         * This is usually only enabled for debugging purposes.
         */
        showFrame: boolean;
        /**
         * Gets or sets whether the blob color texture is used for the proximity
         * light effect. This is usually only disabled for debugging purposes.
         */
        useBlobTexture: boolean;
        /**
         * Gets or sets the world-space position of the tip of the left index finger.
         */
        globalLeftIndexTipPosition: Vector3;
        /**
         * Gets or sets the world-space position of the tip of the right index finger.
         */
        globalRightIndexTipPosition: Vector3;
        private _blobTexture;
        constructor(name: string, scene: Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        /**
         * Get the list of animatables in the material.
         * @returns the list of animatables object used in the material
         */
        getAnimatables(): IAnimatable[];
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): FluentButtonMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): FluentButtonMaterial;
    }
}
declare module "babylonjs-gui/3D/controls/touchHolographicButton" {
    import { Nullable } from "babylonjs/types";
    import { StandardMaterial } from "babylonjs/Materials/standardMaterial";
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { Scene } from "babylonjs/scene";
    import { FluentButtonMaterial } from "babylonjs-gui/3D/materials/fluentButton/fluentButtonMaterial";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    import { TouchButton3D } from "babylonjs-gui/3D/controls/touchButton3D";
    /**
     * Class used to create a holographic button in 3D
     */
    export class TouchHolographicButton extends TouchButton3D {
        /**
         * Base Url for the button model.
         */
        static MODEL_BASE_URL: string;
        /**
         * File name for the button model.
         */
        static MODEL_FILENAME: string;
        private _backPlate;
        private _textPlate;
        private _frontPlate;
        private _text;
        private _imageUrl;
        private _shareMaterials;
        private _frontMaterial;
        private _backMaterial;
        private _plateMaterial;
        private _pickedPointObserver;
        private _pointerHoverObserver;
        private _tooltipFade;
        private _tooltipTextBlock;
        private _tooltipTexture;
        private _tooltipMesh;
        private _tooltipHoverObserver;
        private _tooltipOutObserver;
        private _disposeTooltip;
        /**
         * Rendering ground id of all the mesh in the button
         */
        set renderingGroupId(id: number);
        get renderingGroupId(): number;
        /**
         * Text to be displayed on the tooltip shown when hovering on the button. When set to null tooltip is disabled. (Default: null)
         */
        set tooltipText(text: Nullable<string>);
        get tooltipText(): Nullable<string>;
        /**
         * Gets or sets text for the button
         */
        get text(): string;
        set text(value: string);
        /**
         * Gets or sets the image url for the button
         */
        get imageUrl(): string;
        set imageUrl(value: string);
        /**
         * Gets the back material used by this button
         */
        get backMaterial(): StandardMaterial;
        /**
         * Gets the front material used by this button
         */
        get frontMaterial(): FluentButtonMaterial;
        /**
         * Gets the plate material used by this button
         */
        get plateMaterial(): StandardMaterial;
        /**
         * Gets a boolean indicating if this button shares its material with other HolographicButtons
         */
        get shareMaterials(): boolean;
        /**
         * Creates a new button
         * @param name defines the control name
         */
        constructor(name?: string, shareMaterials?: boolean);
        protected _getTypeName(): string;
        private _rebuildContent;
        protected _createNode(scene: Scene): TransformNode;
        protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
        private _createBackMaterial;
        private _createFrontMaterial;
        private _createPlateMaterial;
        protected _affectMaterial(mesh: Mesh): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/gizmos/slateGizmo" {
    import { Gizmo } from "babylonjs/Gizmos/gizmo";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { UtilityLayerRenderer } from "babylonjs/Rendering/utilityLayerRenderer";
    import { Nullable } from "babylonjs/types";
    import { HolographicSlate } from "babylonjs-gui/3D/controls/holographicSlate";
    /**
     * Gizmo to resize 2D slates
     */
    export class SlateGizmo extends Gizmo {
        private _boundingDimensions;
        private _dragPlaneNormal;
        private _tmpQuaternion;
        private _tmpVector;
        private _corners;
        private _sides;
        private _handlesParent;
        private _boundingBoxGizmo;
        private _dragStartObserver;
        private _draggingObserver;
        private _dragEndObserver;
        private _dragBehavior;
        /**
         * Value we use to offset handles from mesh
         */
        private _margin;
        private _attachedSlate;
        /**
         * If set, the handles will increase in size based on the distance away from the camera to have a consistent screen size (Default: true)
         */
        fixedScreenSize: boolean;
        /**
         * The distance away from the object which the draggable meshes should appear world sized when fixedScreenSize is set to true (default: 10)
         */
        fixedScreenSizeDistanceFactor: number;
        /**
         * Size of the handles
         */
        handleSize: number;
        /**
         * The slate attached to this gizmo
         */
        set attachedSlate(control: Nullable<HolographicSlate>);
        get attachedSlate(): Nullable<HolographicSlate>;
        constructor(utilityLayer?: UtilityLayerRenderer);
        private _createNode;
        private _keepAspectRatio;
        private _clampDimensions;
        private _moveHandle;
        private _assignDragBehavior;
        private _createAngleMesh;
        private _createSideMesh;
        protected _attachedNodeChanged(value: Nullable<AbstractMesh>): void;
        /**
         * Updates the bounding box information for the gizmo
         */
        updateBoundingBox(): void;
        private _updateHandlesPosition;
        protected _update(): void;
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/behaviors/defaultBehavior" {
    import { Behavior } from "babylonjs/Behaviors/behavior";
    import { FollowBehavior } from "babylonjs/Behaviors/Meshes/followBehavior";
    import { SixDofDragBehavior } from "babylonjs/Behaviors/Meshes/sixDofDragBehavior";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { Nullable } from "babylonjs/types";
    /**
     * Default behavior for 3D UI elements.
     * Handles a FollowBehavior, SixDofBehavior and MultiPointerScaleBehavior
     */
    export class DefaultBehavior implements Behavior<Mesh> {
        private _scene;
        private _followBehavior;
        private _sixDofDragBehavior;
        private _onBeforeRender;
        /**
         * Instantiates the default behavior
         */
        constructor();
        /**
         * Attached node of this behavior
         */
        attachedNode: Nullable<Mesh>;
        /**
         *  The name of the behavior
         */
        get name(): string;
        /**
         *  The follow behavior
         */
        get followBehavior(): FollowBehavior;
        /**
         *  The six DoF drag behavior
         */
        get sixDofDragBehavior(): SixDofDragBehavior;
        /**
         * Enables the follow behavior
         */
        followBehaviorEnabled: boolean;
        /**
         * Enables the six DoF drag behavior
         */
        sixDofDragBehaviorEnabled: boolean;
        /**
         *  Initializes the behavior
         */
        init(): void;
        /**
         * Attaches the default behavior
         * @param ownerMesh The top level mesh
         * @param sixDofAnchorMesh A mesh that should behave as an anchor for the sixDof interaction. If unset, the top level mesh will be used
         */
        attach(ownerMesh: Mesh, sixDofAnchorMesh?: Mesh): void;
        /**
         *  Detaches the behavior from the mesh
         */
        detach(): void;
        private _addObservables;
        private _removeObservables;
    }
}
declare module "babylonjs-gui/3D/controls/holographicSlate" {
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { Scene } from "babylonjs/scene";
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { TouchHolographicButton } from "babylonjs-gui/3D/controls/touchHolographicButton";
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { ContentDisplay3D } from "babylonjs-gui/3D/controls/contentDisplay3D";
    import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
    import { SlateGizmo } from "babylonjs-gui/3D/gizmos/slateGizmo";
    import { DefaultBehavior } from "babylonjs-gui/3D/behaviors/defaultBehavior";
    /**
     * Class used to create a holographic slate
     */
    export class HolographicSlate extends ContentDisplay3D {
        /**
         * Base Url for the assets.
         */
        static ASSETS_BASE_URL: string;
        /**
         * File name for the close icon.
         */
        static CLOSE_ICON_FILENAME: string;
        /**
         * File name for the close icon.
         */
        static FOLLOW_ICON_FILENAME: string;
        /**
         * Dimensions of the slate
         */
        dimensions: Vector3;
        /**
         * Minimum dimensions of the slate
         */
        minDimensions: Vector3;
        /**
         * Dimensions of the backplate
         */
        backplateDimensions: Vector3;
        /**
         * Margin between backplate and contentplate
         */
        backPlateMargin: number;
        /**
         * Origin in local coordinates (top left corner)
         */
        origin: Vector3;
        private _backPlateMaterial;
        private _contentMaterial;
        private _pickedPointObserver;
        private _imageUrl;
        /** @hidden */
        _defaultBehavior: DefaultBehavior;
        /** @hidden */
        _gizmo: SlateGizmo;
        protected _backPlate: Mesh;
        protected _contentPlate: Mesh;
        protected _followButton: TouchHolographicButton;
        protected _closeButton: TouchHolographicButton;
        protected _contentScaleRatio: number;
        /**
         * Rendering ground id of all the mesh in the button
         */
        set renderingGroupId(id: number);
        get renderingGroupId(): number;
        /**
         * Gets or sets the image url for the button
         */
        get imageUrl(): string;
        set imageUrl(value: string);
        /**
         * Creates a new slate
         * @param name defines the control name
         */
        constructor(name?: string);
        /**
         * Apply the facade texture (created from the content property).
         * This function can be overloaded by child classes
         * @param facadeTexture defines the AdvancedDynamicTexture to use
         */
        protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
        private _rebuildContent;
        private _addControl;
        protected _getTypeName(): string;
        /**
         * @hidden
         */
        _positionElements(): void;
        /**
         * @hidden
         */
        _updatePivot(): void;
        protected _createNode(scene: Scene): TransformNode;
        protected _affectMaterial(mesh: AbstractMesh): void;
        /** @hidden **/
        _prepareNode(scene: Scene): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/controls/meshButton3D" {
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { Scene } from "babylonjs/scene";
    import { Button3D } from "babylonjs-gui/3D/controls/button3D";
    /**
     * Class used to create an interactable object. It's a 3D button using a mesh coming from the current scene
     */
    export class MeshButton3D extends Button3D {
        /** @hidden */
        protected _currentMesh: Mesh;
        /**
         * Creates a new 3D button based on a mesh
         * @param mesh mesh to become a 3D button
         * @param name defines the control name
         */
        constructor(mesh: Mesh, name?: string);
        protected _getTypeName(): string;
        protected _createNode(scene: Scene): TransformNode;
        protected _affectMaterial(mesh: AbstractMesh): void;
    }
}
declare module "babylonjs-gui/3D/controls/nearMenu" {
    import { Scene } from "babylonjs/scene";
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { Nullable } from "babylonjs/types";
    import { Control3D } from "babylonjs-gui/3D/controls/control3D";
    import { VolumeBasedPanel } from "babylonjs-gui/3D/controls/volumeBasedPanel";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { Container3D } from "babylonjs-gui/3D/controls/container3D";
    import { TouchHolographicButton } from "babylonjs-gui/3D/controls/touchHolographicButton";
    /**
     * NearMenu that displays buttons and follows the camera
     */
    export class NearMenu extends VolumeBasedPanel {
        /**
         * Base Url for the assets.
         */
        private static ASSETS_BASE_URL;
        /**
         * File name for the close icon.
         */
        private static PIN_ICON_FILENAME;
        private _pinButton;
        private _backPlate;
        private _backPlateMaterial;
        private _pinMaterial;
        private _pickedPointObserver;
        private _defaultBehavior;
        private _currentMin;
        private _currentMax;
        private _isPinned;
        /**
         * Indicates if the near menu is world-pinned
         */
        get isPinned(): boolean;
        set isPinned(value: boolean);
        private _createPinButton;
        protected _createNode(scene: Scene): Nullable<TransformNode>;
        protected _affectMaterial(mesh: AbstractMesh): void;
        protected _mapGridNode(control: Control3D, nodePosition: Vector3): void;
        protected _finalProcessing(): void;
        /**
         * Creates a near menu GUI 3D control
         * @param name name of the near menu
         */
        constructor(name: string);
        /**
         * Adds a button to the near menu.
         * Please note that the back material of the button will be set to transparent as it is attached to the near menu.
         *
         * @param button Button to add
         * @returns This near menu
         */
        addButton(button: TouchHolographicButton): NearMenu;
        /**
         * This method should not be used directly. It is inherited from `Container3D`.
         * Please use `addButton` instead.
         * @param _control
         * @returns
         */
        addControl(_control: Control3D): Container3D;
        /**
         * Disposes the near menu
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/controls/planePanel" {
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { Control3D } from "babylonjs-gui/3D/controls/control3D";
    import { VolumeBasedPanel } from "babylonjs-gui/3D/controls/volumeBasedPanel";
    /**
     * Class used to create a container panel deployed on the surface of a plane
     */
    export class PlanePanel extends VolumeBasedPanel {
        protected _mapGridNode(control: Control3D, nodePosition: Vector3): void;
    }
}
declare module "babylonjs-gui/3D/controls/scatterPanel" {
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { float } from "babylonjs/types";
    import { VolumeBasedPanel } from "babylonjs-gui/3D/controls/volumeBasedPanel";
    import { Control3D } from "babylonjs-gui/3D/controls/control3D";
    /**
     * Class used to create a container panel where items get randomized planar mapping
     */
    export class ScatterPanel extends VolumeBasedPanel {
        private _iteration;
        /**
         * Gets or sets the number of iteration to use to scatter the controls (100 by default)
         */
        get iteration(): float;
        set iteration(value: float);
        protected _mapGridNode(control: Control3D, nodePosition: Vector3): void;
        private _scatterMapping;
        protected _finalProcessing(): void;
    }
}
declare module "babylonjs-gui/3D/controls/slider3D" {
    import { Nullable } from "babylonjs/types";
    import { Observable } from "babylonjs/Misc/observable";
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { Scene } from "babylonjs/scene";
    import { Control3D } from "babylonjs-gui/3D/controls/control3D";
    import { StandardMaterial } from "babylonjs/Materials/standardMaterial";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    /**
     * Class used to create a slider in 3D
     */
    export class Slider3D extends Control3D {
        private _sliderBarMaterial;
        private _sliderThumbMaterial;
        private _sliderThumb;
        private _sliderBar;
        private _minimum;
        private _maximum;
        private _value;
        private _step;
        /** Observable raised when the sldier value changes */
        onValueChangedObservable: Observable<number>;
        /**
         * Creates a new slider
         * @param name defines the control name
         */
        constructor(name?: string);
        /**
         * Gets the mesh used to render this control
         */
        get mesh(): Nullable<AbstractMesh>;
        /** Gets or sets minimum value */
        get minimum(): number;
        set minimum(value: number);
        /** Gets or sets maximum value */
        get maximum(): number;
        set maximum(value: number);
        /** Gets or sets step value */
        get step(): number;
        set step(value: number);
        /** Gets or sets current value */
        get value(): number;
        set value(value: number);
        protected get start(): number;
        protected get end(): number;
        /**
         * Gets the slider bar material used by this control
         */
        get sliderBarMaterial(): StandardMaterial;
        /**
         * Gets the slider thumb material used by this control
         */
        get sliderThumbMaterial(): StandardMaterial;
        protected _createNode(scene: Scene): TransformNode;
        protected _affectMaterial(mesh: AbstractMesh): void;
        private _createBehavior;
        private _convertToPosition;
        private _convertToValue;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/controls/spherePanel" {
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { float } from "babylonjs/types";
    import { VolumeBasedPanel } from "babylonjs-gui/3D/controls/volumeBasedPanel";
    import { Control3D } from "babylonjs-gui/3D/controls/control3D";
    /**
     * Class used to create a container panel deployed on the surface of a sphere
     */
    export class SpherePanel extends VolumeBasedPanel {
        private _radius;
        /**
         * Gets or sets the radius of the sphere where to project controls (5 by default)
         */
        get radius(): float;
        set radius(value: float);
        protected _mapGridNode(control: Control3D, nodePosition: Vector3): void;
        private _sphericalMapping;
    }
}
declare module "babylonjs-gui/3D/controls/stackPanel3D" {
    import { Container3D } from "babylonjs-gui/3D/controls/container3D";
    /**
     * Class used to create a stack panel in 3D on XY plane
     */
    export class StackPanel3D extends Container3D {
        private _isVertical;
        /**
         * Gets or sets a boolean indicating if the stack panel is vertical or horizontal (horizontal by default)
         */
        get isVertical(): boolean;
        set isVertical(value: boolean);
        /**
         * Gets or sets the distance between elements
         */
        margin: number;
        /**
         * Creates new StackPanel
         * @param isVertical
         */
        constructor(isVertical?: boolean);
        protected _arrangeChildren(): void;
    }
}
declare module "babylonjs-gui/3D/controls/touchMeshButton3D" {
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { Scene } from "babylonjs/scene";
    import { TouchButton3D } from "babylonjs-gui/3D/controls/touchButton3D";
    /**
     * Class used to create an interactable object. It's a touchable 3D button using a mesh coming from the current scene
     */
    export class TouchMeshButton3D extends TouchButton3D {
        /** @hidden */
        protected _currentMesh: Mesh;
        /**
         * Creates a new 3D button based on a mesh
         * @param mesh mesh to become a 3D button
         * @param collisionMesh mesh to track collisions with
         * @param name defines the control name
         */
        constructor(mesh: Mesh, options: {
            collisionMesh: Mesh;
            useDynamicMesh?: boolean;
        }, name?: string);
        protected _getTypeName(): string;
        protected _createNode(scene: Scene): TransformNode;
        protected _affectMaterial(mesh: AbstractMesh): void;
    }
}
declare module "babylonjs-gui/3D/controls/touchToggleButton3D" {
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { Observable } from "babylonjs/Misc/observable";
    import { Scene } from "babylonjs/scene";
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { Vector3 } from "babylonjs/Maths/math.vector";
    import { TouchButton3D } from "babylonjs-gui/3D/controls/touchButton3D";
    /**
     * Class used as base class for touch-enabled toggleable buttons
     */
    export class TouchToggleButton3D extends TouchButton3D {
        private _isPressed;
        /**
         * An event triggered when the button is toggled on
         */
        onToggleOnObservable: Observable<Vector3>;
        /**
         * An event triggered when the button is toggled off
         */
        onToggleOffObservable: Observable<Vector3>;
        /**
         * Creates a new button
         * @param name defines the control name
         * @param collisionMesh defines the mesh to track near interactions with
         */
        constructor(name?: string, collisionMesh?: Mesh);
        private _onToggle;
        protected _getTypeName(): string;
        protected _createNode(scene: Scene): TransformNode;
        protected _affectMaterial(mesh: AbstractMesh): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/materials/fluentBackplate/shaders/fluentBackplate.fragment" {
    /** @hidden */
    export var fluentBackplatePixelShader: {
        name: string;
        shader: string;
    };
}
declare module "babylonjs-gui/3D/materials/fluentBackplate/shaders/fluentBackplate.vertex" {
    /** @hidden */
    export var fluentBackplateVertexShader: {
        name: string;
        shader: string;
    };
}
declare module "babylonjs-gui/3D/materials/fluentBackplate/fluentBackplateMaterial" {
    import { Nullable } from "babylonjs/types";
    import { Matrix, Vector3, Vector4 } from "babylonjs/Maths/math.vector";
    import { IAnimatable } from "babylonjs/Animations/animatable.interface";
    import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
    import { PushMaterial } from "babylonjs/Materials/pushMaterial";
    import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
    import { SubMesh } from "babylonjs/Meshes/subMesh";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { Scene } from "babylonjs/scene";
    import { Color4 } from "babylonjs/Maths/math.color";
    import "babylonjs-gui/3D/materials/fluentBackplate/shaders/fluentBackplate.fragment";
    import "babylonjs-gui/3D/materials/fluentBackplate/shaders/fluentBackplate.vertex";
    /**
     * Class used to render square buttons with fluent desgin
     */
    export class FluentBackplateMaterial extends PushMaterial {
        /**
         * URL pointing to the texture used to define the coloring for the fluent blob effect.
         */
        static BLOB_TEXTURE_URL: string;
        /**
         * URL pointing to the texture used to define iridescent map.
         */
        static IM_TEXTURE_URL: string;
        private _blobTexture;
        private _iridescentMap;
        /**
         * Gets or sets the corner radius on the backplate. Best to keep this value between 0.01 and 0.5. Default is 0.03.
         */
        radius: number;
        /**
         * Gets or sets the line width of the backplate.
         */
        lineWidth: number;
        /**
         * Gets or sets whether to use absolute sizes when calculating effects on the backplate.
         * Since desktop and VR/AR have different relative sizes, it's usually best to keep this false.
         */
        absoluteSizes: boolean;
        /** @hidden */
        _filterWidth: number;
        /**
         * Gets or sets the base color of the backplate.
         */
        baseColor: Color4;
        /**
         * Gets or sets the line color of the backplate.
         */
        lineColor: Color4;
        /**
         * Gets or sets the intensity of the fluent hover glow effect.
         */
        blobIntensity: number;
        /**
         * Gets or sets the far size of the fluent hover glow effect.
         */
        blobFarSize: number;
        /**
         * Gets or sets the distance considered "near" to the backplate, which controls the size of the fluent hover glow effect (see blobNearSize).
         */
        blobNearDistance: number;
        /**
         * Gets or sets the distance considered "far" from the backplate, which controls the size of the fluent hover glow effect (see blobFarSize).
         */
        blobFarDistance: number;
        /**
         * Gets or sets the length of the fluent hover glow effect fade.
         */
        blobFadeLength: number;
        /**
         * Gets or sets the size of the fluent hover glow effect when the left pointer is considered "near" to the backplate (see blobNearDistance).
         */
        blobNearSize: number;
        /**
         * Gets or sets the progress of the fluent hover glow effect selection animation corresponding to the left pointer (0.0 - 1.0).
         */
        blobPulse: number;
        /**
         * Gets or sets the opacity of the fluent hover glow effect corresponding to the left pointer (0.0 - 1.0). Default is 0.
         */
        blobFade: number;
        /**
         * Gets or sets the size of the fluent hover glow effect when the right pointer is considered "near" to the backplate (see blobNearDistance).
         */
        blobNearSize2: number;
        /**
         * Gets or sets the progress of the fluent hover glow effect selection animation corresponding to the right pointer (0.0 - 1.0).
         */
        blobPulse2: number;
        /**
         * Gets or sets the opacity of the fluent hover glow effect corresponding to the right pointer (0.0 - 1.0). Default is 0.
         */
        blobFade2: number;
        /** @hidden */
        _rate: number;
        /**
         * Gets or sets the color of the highlights on the backplate line.
         */
        highlightColor: Color4;
        /**
         * Gets or sets the width of the highlights on the backplate line.
         */
        highlightWidth: number;
        /** @hidden */
        _highlightTransform: Vector4;
        /** @hidden */
        _highlight: number;
        /**
         * Gets or sets the intensity of the iridescence effect.
         */
        iridescenceIntensity: number;
        /**
         * Gets or sets the intensity of the iridescence effect on the backplate edges.
         */
        iridescenceEdgeIntensity: number;
        /** @hidden */
        _angle: number;
        /**
         * Gets or sets the opacity of the backplate (0.0 - 1.0).
         */
        fadeOut: number;
        /** @hidden */
        _reflected: boolean;
        /** @hidden */
        _frequency: number;
        /** @hidden */
        _verticalOffset: number;
        /**
         * Gets or sets the world-space position of the tip of the left index finger.
         */
        globalLeftIndexTipPosition: Vector3;
        private _globalLeftIndexTipPosition4;
        /**
         * Gets or sets the world-space position of the tip of the right index finger.
         */
        globalRightIndexTipPosition: Vector3;
        private _globalRightIndexTipPosition4;
        constructor(name: string, scene: Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        /**
         * Get the list of animatables in the material.
         * @returns the list of animatables object used in the material
         */
        getAnimatables(): IAnimatable[];
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): FluentBackplateMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): FluentBackplateMaterial;
    }
}
declare module "babylonjs-gui/3D/controls/holographicBackplate" {
    import { TransformNode } from "babylonjs/Meshes/transformNode";
    import { Mesh } from "babylonjs/Meshes/mesh";
    import { Scene } from "babylonjs/scene";
    import { FluentBackplateMaterial } from "babylonjs-gui/3D/materials/fluentBackplate/fluentBackplateMaterial";
    import { Control3D } from "babylonjs-gui/3D/controls/control3D";
    /**
     * Class used to create a holographic backplate in 3D
     */
    export class HolographicBackplate extends Control3D {
        private _shareMaterials;
        /**
         * Base Url for the button model.
         */
        static MODEL_BASE_URL: string;
        /**
         * File name for the button model.
         */
        static MODEL_FILENAME: string;
        private _model;
        private _material;
        /**
         * Rendering ground id of the backplate mesh.
         */
        set renderingGroupId(id: number);
        get renderingGroupId(): number;
        /**
         * Gets the material used by the backplate
         */
        get material(): FluentBackplateMaterial;
        /**
         * Gets a boolean indicating if this backplate shares its material with other HolographicBackplates
         */
        get shareMaterials(): boolean;
        /**
         * Creates a new holographic backplate
         * @param name defines the control name
         */
        constructor(name?: string, _shareMaterials?: boolean);
        protected _getTypeName(): string;
        protected _createNode(scene: Scene): TransformNode;
        private _createMaterial;
        protected _affectMaterial(mesh: Mesh): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module "babylonjs-gui/3D/controls/index" {
    export * from "babylonjs-gui/3D/controls/abstractButton3D";
    export * from "babylonjs-gui/3D/controls/button3D";
    export * from "babylonjs-gui/3D/controls/container3D";
    export * from "babylonjs-gui/3D/controls/control3D";
    export * from "babylonjs-gui/3D/controls/cylinderPanel";
    export * from "babylonjs-gui/3D/controls/holographicButton";
    export * from "babylonjs-gui/3D/controls/holographicSlate";
    export * from "babylonjs-gui/3D/controls/meshButton3D";
    export * from "babylonjs-gui/3D/controls/nearMenu";
    export * from "babylonjs-gui/3D/controls/planePanel";
    export * from "babylonjs-gui/3D/controls/scatterPanel";
    export * from "babylonjs-gui/3D/controls/slider3D";
    export * from "babylonjs-gui/3D/controls/spherePanel";
    export * from "babylonjs-gui/3D/controls/stackPanel3D";
    export * from "babylonjs-gui/3D/controls/touchButton3D";
    export * from "babylonjs-gui/3D/controls/touchMeshButton3D";
    export * from "babylonjs-gui/3D/controls/touchHolographicButton";
    export * from "babylonjs-gui/3D/controls/touchToggleButton3D";
    export * from "babylonjs-gui/3D/controls/volumeBasedPanel";
    export * from "babylonjs-gui/3D/controls/holographicBackplate";
}
declare module "babylonjs-gui/3D/materials/fluent/index" {
    export * from "babylonjs-gui/3D/materials/fluent/fluentMaterial";
}
declare module "babylonjs-gui/3D/materials/fluentButton/index" {
    export * from "babylonjs-gui/3D/materials/fluentButton/fluentButtonMaterial";
}
declare module "babylonjs-gui/3D/materials/fluentBackplate/index" {
    export * from "babylonjs-gui/3D/materials/fluentBackplate/fluentBackplateMaterial";
}
declare module "babylonjs-gui/3D/materials/index" {
    export * from "babylonjs-gui/3D/materials/fluent/index";
    export * from "babylonjs-gui/3D/materials/fluentButton/index";
    export * from "babylonjs-gui/3D/materials/fluentBackplate/index";
}
declare module "babylonjs-gui/3D/gizmos/index" {
    export * from "babylonjs-gui/3D/gizmos/slateGizmo";
}
declare module "babylonjs-gui/3D/index" {
    export * from "babylonjs-gui/3D/controls/index";
    export * from "babylonjs-gui/3D/materials/index";
    export * from "babylonjs-gui/3D/gizmos/index";
    export * from "babylonjs-gui/3D/gui3DManager";
    export * from "babylonjs-gui/3D/vector3WithInfo";
}
declare module "babylonjs-gui/index" {
    export * from "babylonjs-gui/2D/index";
    export * from "babylonjs-gui/3D/index";
}
declare module "babylonjs-gui/legacy/legacy" {
    export * from "babylonjs-gui/index";
}
declare module "babylonjs-gui" {
    export * from "babylonjs-gui/legacy/legacy";
}
declare module BABYLON.GUI {
    /**
    * Interface used to define a control that can receive focus
    */
    export interface IFocusableControl {
        /**
         * Function called when the control receives the focus
         */
        onFocus(): void;
        /**
         * Function called when the control loses the focus
         */
        onBlur(): void;
        /**
         * Function called to let the control handle keyboard events
         * @param evt defines the current keyboard event
         */
        processKeyboard(evt: BABYLON.IKeyboardEvent): void;
        /**
        * Function called to get the list of controls that should not steal the focus from this control
        * @returns an array of controls
        */
        keepsFocusWith(): BABYLON.Nullable<Control[]>;
        /**
        * Function to focus the control programmatically
        */
        focus(): void;
        /**
        * Function to unfocus the control programmatically
        */
        blur(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to specific a value and its associated unit
     */
    export class ValueAndUnit {
        /** defines the unit to store */
        unit: number;
        /** defines a boolean indicating if the value can be negative */
        negativeValueAllowed: boolean;
        private _value;
        private _originalUnit;
        /**
         * Gets or sets a value indicating that this value will not scale accordingly with adaptive scaling property
         * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
         */
        ignoreAdaptiveScaling: boolean;
        /**
         * Creates a new ValueAndUnit
         * @param value defines the value to store
         * @param unit defines the unit to store
         * @param negativeValueAllowed defines a boolean indicating if the value can be negative
         */
        constructor(value: number, 
        /** defines the unit to store */
        unit?: number, 
        /** defines a boolean indicating if the value can be negative */
        negativeValueAllowed?: boolean);
        /** Gets a boolean indicating if the value is a percentage */
        get isPercentage(): boolean;
        /** Gets a boolean indicating if the value is store as pixel */
        get isPixel(): boolean;
        /** Gets direct internal value */
        get internalValue(): number;
        /**
         * Gets value as pixel
         * @param host defines the root host
         * @param refValue defines the reference value for percentages
         * @returns the value as pixel
         */
        getValueInPixel(host: AdvancedDynamicTexture, refValue: number): number;
        /**
         * Update the current value and unit. This should be done cautiously as the GUi won't be marked as dirty with this function.
         * @param value defines the value to store
         * @param unit defines the unit to store
         * @returns the current ValueAndUnit
         */
        updateInPlace(value: number, unit?: number): ValueAndUnit;
        /**
         * Gets the value accordingly to its unit
         * @param host  defines the root host
         * @returns the value
         */
        getValue(host: AdvancedDynamicTexture): number;
        /**
         * Gets a string representation of the value
         * @param host defines the root host
         * @param decimals defines an optional number of decimals to display
         * @returns a string
         */
        toString(host: AdvancedDynamicTexture, decimals?: number): string;
        /**
         * Store a value parsed from a string
         * @param source defines the source string
         * @returns true if the value was successfully parsed
         */
        fromString(source: string | number): boolean;
        private static _Regex;
        private static _UNITMODE_PERCENTAGE;
        private static _UNITMODE_PIXEL;
        /** UNITMODE_PERCENTAGE */
        static get UNITMODE_PERCENTAGE(): number;
        /** UNITMODE_PIXEL */
        static get UNITMODE_PIXEL(): number;
    }
}
declare module BABYLON.GUI {
    /**
     * Define a style used by control to automatically setup properties based on a template.
     * Only support font related properties so far
     */
    export class Style implements BABYLON.IDisposable {
        private _fontFamily;
        private _fontStyle;
        private _fontWeight;
        /** @hidden */
        _host: AdvancedDynamicTexture;
        /** @hidden */
        _fontSize: ValueAndUnit;
        /**
         * BABYLON.Observable raised when the style values are changed
         */
        onChangedObservable: BABYLON.Observable<Style>;
        /**
         * Creates a new style object
         * @param host defines the AdvancedDynamicTexture which hosts this style
         */
        constructor(host: AdvancedDynamicTexture);
        /**
         * Gets or sets the font size
         */
        get fontSize(): string | number;
        set fontSize(value: string | number);
        /**
         * Gets or sets the font family
         */
        get fontFamily(): string;
        set fontFamily(value: string);
        /**
         * Gets or sets the font style
         */
        get fontStyle(): string;
        set fontStyle(value: string);
        /** Gets or sets font weight */
        get fontWeight(): string;
        set fontWeight(value: string);
        /** Dispose all associated resources */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to transport BABYLON.Vector2 information for pointer events
     */
    export class Vector2WithInfo extends BABYLON.Vector2 {
        /** defines the current mouse button index */
        buttonIndex: number;
        /**
         * Creates a new Vector2WithInfo
         * @param source defines the vector2 data to transport
         * @param buttonIndex defines the current mouse button index
         */
        constructor(source: BABYLON.Vector2, 
        /** defines the current mouse button index */
        buttonIndex?: number);
    }
    /** Class used to provide 2D matrix features */
    export class Matrix2D {
        /** Gets the internal array of 6 floats used to store matrix data */
        m: Float32Array;
        /**
         * Creates a new matrix
         * @param m00 defines value for (0, 0)
         * @param m01 defines value for (0, 1)
         * @param m10 defines value for (1, 0)
         * @param m11 defines value for (1, 1)
         * @param m20 defines value for (2, 0)
         * @param m21 defines value for (2, 1)
         */
        constructor(m00: number, m01: number, m10: number, m11: number, m20: number, m21: number);
        /**
         * Fills the matrix from direct values
         * @param m00 defines value for (0, 0)
         * @param m01 defines value for (0, 1)
         * @param m10 defines value for (1, 0)
         * @param m11 defines value for (1, 1)
         * @param m20 defines value for (2, 0)
         * @param m21 defines value for (2, 1)
         * @returns the current modified matrix
         */
        fromValues(m00: number, m01: number, m10: number, m11: number, m20: number, m21: number): Matrix2D;
        /**
         * Gets matrix determinant
         * @returns the determinant
         */
        determinant(): number;
        /**
         * Inverses the matrix and stores it in a target matrix
         * @param result defines the target matrix
         * @returns the current matrix
         */
        invertToRef(result: Matrix2D): Matrix2D;
        /**
         * Multiplies the current matrix with another one
         * @param other defines the second operand
         * @param result defines the target matrix
         * @returns the current matrix
         */
        multiplyToRef(other: Matrix2D, result: Matrix2D): Matrix2D;
        /**
         * Applies the current matrix to a set of 2 floats and stores the result in a vector2
         * @param x defines the x coordinate to transform
         * @param y defines the x coordinate to transform
         * @param result defines the target vector2
         * @returns the current matrix
         */
        transformCoordinates(x: number, y: number, result: BABYLON.Vector2): Matrix2D;
        /**
         * Creates an identity matrix
         * @returns a new matrix
         */
        static Identity(): Matrix2D;
        /**
         * Creates a translation matrix and stores it in a target matrix
         * @param x defines the x coordinate of the translation
         * @param y defines the y coordinate of the translation
         * @param result defines the target matrix
         */
        static TranslationToRef(x: number, y: number, result: Matrix2D): void;
        /**
         * Creates a scaling matrix and stores it in a target matrix
         * @param x defines the x coordinate of the scaling
         * @param y defines the y coordinate of the scaling
         * @param result defines the target matrix
         */
        static ScalingToRef(x: number, y: number, result: Matrix2D): void;
        /**
         * Creates a rotation matrix and stores it in a target matrix
         * @param angle defines the rotation angle
         * @param result defines the target matrix
         */
        static RotationToRef(angle: number, result: Matrix2D): void;
        private static _TempPreTranslationMatrix;
        private static _TempPostTranslationMatrix;
        private static _TempRotationMatrix;
        private static _TempScalingMatrix;
        private static _TempCompose0;
        private static _TempCompose1;
        private static _TempCompose2;
        /**
         * Composes a matrix from translation, rotation, scaling and parent matrix and stores it in a target matrix
         * @param tx defines the x coordinate of the translation
         * @param ty defines the y coordinate of the translation
         * @param angle defines the rotation angle
         * @param scaleX defines the x coordinate of the scaling
         * @param scaleY defines the y coordinate of the scaling
         * @param parentMatrix defines the parent matrix to multiply by (can be null)
         * @param result defines the target matrix
         */
        static ComposeToRef(tx: number, ty: number, angle: number, scaleX: number, scaleY: number, parentMatrix: BABYLON.Nullable<Matrix2D>, result: Matrix2D): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to store 2D control sizes
     */
    export class Measure {
        /** defines left coordinate */
        left: number;
        /** defines top coordinate  */
        top: number;
        /** defines width dimension  */
        width: number;
        /** defines height dimension */
        height: number;
        /**
         * Creates a new measure
         * @param left defines left coordinate
         * @param top defines top coordinate
         * @param width defines width dimension
         * @param height defines height dimension
         */
        constructor(
        /** defines left coordinate */
        left: number, 
        /** defines top coordinate  */
        top: number, 
        /** defines width dimension  */
        width: number, 
        /** defines height dimension */
        height: number);
        /**
         * Copy from another measure
         * @param other defines the other measure to copy from
         */
        copyFrom(other: Measure): void;
        /**
         * Copy from a group of 4 floats
         * @param left defines left coordinate
         * @param top defines top coordinate
         * @param width defines width dimension
         * @param height defines height dimension
         */
        copyFromFloats(left: number, top: number, width: number, height: number): void;
        /**
         * Computes the axis aligned bounding box measure for two given measures
         * @param a Input measure
         * @param b Input measure
         * @param result the resulting bounding measure
         */
        static CombineToRef(a: Measure, b: Measure, result: Measure): void;
        /**
         * Computes the axis aligned bounding box of the measure after it is modified by a given transform
         * @param transform the matrix to transform the measure before computing the AABB
         * @param addX number to add to left
         * @param addY number to add to top
         * @param addWidth number to add to width
         * @param addHeight number to add to height
         * @param result the resulting AABB
         */
        addAndTransformToRef(transform: Matrix2D, addX: number, addY: number, addWidth: number, addHeight: number, result: Measure): void;
        /**
         * Computes the axis aligned bounding box of the measure after it is modified by a given transform
         * @param transform the matrix to transform the measure before computing the AABB
         * @param result the resulting AABB
         */
        transformToRef(transform: Matrix2D, result: Measure): void;
        /**
     * Check equality between this measure and another one
     * @param other defines the other measures
     * @returns true if both measures are equals
     */
        isEqualsTo(other: Measure): boolean;
        /**
         * Creates an empty measure
         * @returns a new measure
         */
        static Empty(): Measure;
    }
}
declare module BABYLON.GUI {
    /**
    * Class used to create texture to support 2D GUI elements
    * @see https://doc.babylonjs.com/how_to/gui
    */
    export class AdvancedDynamicTexture extends BABYLON.DynamicTexture {
        /** Define the Uurl to load snippets */
        static SnippetUrl: string;
        /** Snippet ID if the content was created from the snippet server */
        snippetId: string;
        private _isDirty;
        private _renderObserver;
        private _resizeObserver;
        private _preKeyboardObserver;
        private _pointerMoveObserver;
        private _pointerObserver;
        private _canvasPointerOutObserver;
        private _canvasBlurObserver;
        private _background;
        /** @hidden */
        _rootContainer: Container;
        /** @hidden */
        _lastPickedControl: Control;
        /** @hidden */
        _lastControlOver: {
            [pointerId: number]: Control;
        };
        /** @hidden */
        _lastControlDown: {
            [pointerId: number]: Control;
        };
        /** @hidden */
        _capturingControl: {
            [pointerId: number]: Control;
        };
        /** @hidden */
        _shouldBlockPointer: boolean;
        /** @hidden */
        _layerToDispose: BABYLON.Nullable<BABYLON.Layer>;
        /** @hidden */
        _linkedControls: Control[];
        private _isFullscreen;
        private _fullscreenViewport;
        private _idealWidth;
        private _idealHeight;
        private _useSmallestIdeal;
        private _renderAtIdealSize;
        private _focusedControl;
        private _blockNextFocusCheck;
        private _renderScale;
        private _rootElement;
        private _cursorChanged;
        private _defaultMousePointerId;
        /** @hidden */
        _numLayoutCalls: number;
        /** Gets the number of layout calls made the last time the ADT has been rendered */
        get numLayoutCalls(): number;
        /** @hidden */
        _numRenderCalls: number;
        /** Gets the number of render calls made the last time the ADT has been rendered */
        get numRenderCalls(): number;
        /**
        * Define type to string to ensure compatibility across browsers
        * Safari doesn't support DataTransfer constructor
        */
        private _clipboardData;
        /**
        * BABYLON.Observable event triggered each time an clipboard event is received from the rendering canvas
        */
        onClipboardObservable: BABYLON.Observable<BABYLON.ClipboardInfo>;
        /**
        * BABYLON.Observable event triggered each time a pointer down is intercepted by a control
        */
        onControlPickedObservable: BABYLON.Observable<Control>;
        /**
        * BABYLON.Observable event triggered before layout is evaluated
        */
        onBeginLayoutObservable: BABYLON.Observable<AdvancedDynamicTexture>;
        /**
        * BABYLON.Observable event triggered after the layout was evaluated
        */
        onEndLayoutObservable: BABYLON.Observable<AdvancedDynamicTexture>;
        /**
        * BABYLON.Observable event triggered before the texture is rendered
        */
        onBeginRenderObservable: BABYLON.Observable<AdvancedDynamicTexture>;
        /**
        * BABYLON.Observable event triggered after the texture was rendered
        */
        onEndRenderObservable: BABYLON.Observable<AdvancedDynamicTexture>;
        /**
        * Gets or sets a boolean defining if alpha is stored as premultiplied
        */
        premulAlpha: boolean;
        /**
         * Gets or sets a boolean indicating that the canvas must be reverted on Y when updating the texture
         */
        applyYInversionOnUpdate: boolean;
        /**
        * Gets or sets a number used to scale rendering size (2 means that the texture will be twice bigger).
        * Useful when you want more antialiasing
        */
        get renderScale(): number;
        set renderScale(value: number);
        /** Gets or sets the background color */
        get background(): string;
        set background(value: string);
        /**
        * Gets or sets the ideal width used to design controls.
        * The GUI will then rescale everything accordingly
        * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
        */
        get idealWidth(): number;
        set idealWidth(value: number);
        /**
        * Gets or sets the ideal height used to design controls.
        * The GUI will then rescale everything accordingly
        * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
        */
        get idealHeight(): number;
        set idealHeight(value: number);
        /**
        * Gets or sets a boolean indicating if the smallest ideal value must be used if idealWidth and idealHeight are both set
        * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
        */
        get useSmallestIdeal(): boolean;
        set useSmallestIdeal(value: boolean);
        /**
        * Gets or sets a boolean indicating if adaptive scaling must be used
        * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
        */
        get renderAtIdealSize(): boolean;
        set renderAtIdealSize(value: boolean);
        /**
         * Gets the ratio used when in "ideal mode"
        * @see https://doc.babylonjs.com/how_to/gui#adaptive-scaling
         * */
        get idealRatio(): number;
        /**
        * Gets the underlying layer used to render the texture when in fullscreen mode
        */
        get layer(): BABYLON.Nullable<BABYLON.Layer>;
        /**
        * Gets the root container control
        */
        get rootContainer(): Container;
        /**
        * Returns an array containing the root container.
        * This is mostly used to let the Inspector introspects the ADT
        * @returns an array containing the rootContainer
        */
        getChildren(): Array<Container>;
        /**
        * Will return all controls that are inside this texture
        * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
        * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
        * @return all child controls
        */
        getDescendants(directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): Control[];
        /**
        * Gets or sets the current focused control
        */
        get focusedControl(): BABYLON.Nullable<IFocusableControl>;
        set focusedControl(control: BABYLON.Nullable<IFocusableControl>);
        /**
        * Gets or sets a boolean indicating if the texture must be rendered in background or foreground when in fullscreen mode
        */
        get isForeground(): boolean;
        set isForeground(value: boolean);
        /**
        * Gets or set information about clipboardData
        */
        get clipboardData(): string;
        set clipboardData(value: string);
        /**
       * Creates a new AdvancedDynamicTexture
       * @param name defines the name of the texture
       * @param width defines the width of the texture
       * @param height defines the height of the texture
       * @param scene defines the hosting scene
       * @param generateMipMaps defines a boolean indicating if mipmaps must be generated (false by default)
       * @param samplingMode defines the texture sampling mode (Texture.NEAREST_SAMPLINGMODE by default)
       * @param invertY defines if the texture needs to be inverted on the y axis during loading (true by default)
       */
        constructor(name: string, width: number | undefined, height: number | undefined, scene: BABYLON.Nullable<BABYLON.Scene>, generateMipMaps?: boolean, samplingMode?: number, invertY?: boolean);
        /**
        * Get the current class name of the texture useful for serialization or dynamic coding.
        * @returns "AdvancedDynamicTexture"
        */
        getClassName(): string;
        /**
        * Function used to execute a function on all controls
        * @param func defines the function to execute
        * @param container defines the container where controls belong. If null the root container will be used
        */
        executeOnAllControls(func: (control: Control) => void, container?: Container): void;
        private _useInvalidateRectOptimization;
        /**
         * Gets or sets a boolean indicating if the InvalidateRect optimization should be turned on
         */
        get useInvalidateRectOptimization(): boolean;
        set useInvalidateRectOptimization(value: boolean);
        private _invalidatedRectangle;
        /**
         * Invalidates a rectangle area on the gui texture
         * @param invalidMinX left most position of the rectangle to invalidate in the texture
         * @param invalidMinY top most position of the rectangle to invalidate in the texture
         * @param invalidMaxX right most position of the rectangle to invalidate in the texture
         * @param invalidMaxY bottom most position of the rectangle to invalidate in the texture
         */
        invalidateRect(invalidMinX: number, invalidMinY: number, invalidMaxX: number, invalidMaxY: number): void;
        /**
        * Marks the texture as dirty forcing a complete update
        */
        markAsDirty(): void;
        /**
        * Helper function used to create a new style
        * @returns a new style
        * @see https://doc.babylonjs.com/how_to/gui#styles
        */
        createStyle(): Style;
        /**
        * Adds a new control to the root container
        * @param control defines the control to add
        * @returns the current texture
        */
        addControl(control: Control): AdvancedDynamicTexture;
        /**
        * Removes a control from the root container
        * @param control defines the control to remove
        * @returns the current texture
        */
        removeControl(control: Control): AdvancedDynamicTexture;
        /**
        * Release all resources
        */
        dispose(): void;
        private _onResize;
        /** @hidden */
        _getGlobalViewport(): BABYLON.Viewport;
        /**
        * Get screen coordinates for a vector3
        * @param position defines the position to project
        * @param worldMatrix defines the world matrix to use
        * @returns the projected position
        */
        getProjectedPosition(position: BABYLON.Vector3, worldMatrix: BABYLON.Matrix): BABYLON.Vector2;
        /**
        * Get screen coordinates for a vector3
        * @param position defines the position to project
        * @param worldMatrix defines the world matrix to use
        * @returns the projected position with Z
        */
        getProjectedPositionWithZ(position: BABYLON.Vector3, worldMatrix: BABYLON.Matrix): BABYLON.Vector3;
        private _checkUpdate;
        private _clearMeasure;
        private _render;
        /** @hidden */
        _changeCursor(cursor: string): void;
        /** @hidden */
        _registerLastControlDown(control: Control, pointerId: number): void;
        private _doPicking;
        /** @hidden */
        _cleanControlAfterRemovalFromList(list: {
            [pointerId: number]: Control;
        }, control: Control): void;
        /** @hidden */
        _cleanControlAfterRemoval(control: Control): void;
        /** Attach to all scene events required to support pointer events */
        attach(): void;
        /** @hidden */
        private onClipboardCopy;
        /** @hidden */
        private onClipboardCut;
        /** @hidden */
        private onClipboardPaste;
        /**
        * Register the clipboard Events onto the canvas
        */
        registerClipboardEvents(): void;
        /**
         * Unregister the clipboard Events from the canvas
         */
        unRegisterClipboardEvents(): void;
        /**
        * Connect the texture to a hosting mesh to enable interactions
        * @param mesh defines the mesh to attach to
        * @param supportPointerMove defines a boolean indicating if pointer move events must be catched as well
        */
        attachToMesh(mesh: BABYLON.AbstractMesh, supportPointerMove?: boolean): void;
        /**
        * Move the focus to a specific control
        * @param control defines the control which will receive the focus
        */
        moveFocusToControl(control: IFocusableControl): void;
        private _manageFocus;
        private _attachToOnPointerOut;
        private _attachToOnBlur;
        /**
         * Serializes the entire GUI system
         * @returns an object with the JSON serialized data
         */
        serializeContent(): any;
        /**
         * Recreate the content of the ADT from a JSON object
         * @param serializedObject define the JSON serialized object to restore from
         */
        parseContent(serializedObject: any): void;
        /**
         * Recreate the content of the ADT from a snippet saved by the GUI editor
         * @param snippetId defines the snippet to load
         * @returns a promise that will resolve on success
         */
        parseFromSnippetAsync(snippetId: string): Promise<void>;
        /**
         * Creates a new AdvancedDynamicTexture in projected mode (ie. attached to a mesh)
         * @param mesh defines the mesh which will receive the texture
         * @param width defines the texture width (1024 by default)
         * @param height defines the texture height (1024 by default)
         * @param supportPointerMove defines a boolean indicating if the texture must capture move events (true by default)
         * @param onlyAlphaTesting defines a boolean indicating that alpha blending will not be used (only alpha testing) (false by default)
         * @param invertY defines if the texture needs to be inverted on the y axis during loading (true by default)
         * @returns a new AdvancedDynamicTexture
         */
        static CreateForMesh(mesh: BABYLON.AbstractMesh, width?: number, height?: number, supportPointerMove?: boolean, onlyAlphaTesting?: boolean, invertY?: boolean): AdvancedDynamicTexture;
        /**
         * Creates a new AdvancedDynamicTexture in projected mode (ie. attached to a mesh) BUT do not create a new material for the mesh. You will be responsible for connecting the texture
         * @param mesh defines the mesh which will receive the texture
         * @param width defines the texture width (1024 by default)
         * @param height defines the texture height (1024 by default)
         * @param supportPointerMove defines a boolean indicating if the texture must capture move events (true by default)
         * @param invertY defines if the texture needs to be inverted on the y axis during loading (true by default)
         * @returns a new AdvancedDynamicTexture
         */
        static CreateForMeshTexture(mesh: BABYLON.AbstractMesh, width?: number, height?: number, supportPointerMove?: boolean, invertY?: boolean): AdvancedDynamicTexture;
        /**
        * Creates a new AdvancedDynamicTexture in fullscreen mode.
        * In this mode the texture will rely on a layer for its rendering.
        * This allows it to be treated like any other layer.
        * As such, if you have a multi camera setup, you can set the layerMask on the GUI as well.
        * LayerMask is set through advancedTexture.layer.layerMask
        * @param name defines name for the texture
        * @param foreground defines a boolean indicating if the texture must be rendered in foreground (default is true)
        * @param scene defines the hsoting scene
        * @param sampling defines the texture sampling mode (Texture.BILINEAR_SAMPLINGMODE by default)
        * @returns a new AdvancedDynamicTexture
        */
        static CreateFullscreenUI(name: string, foreground?: boolean, scene?: BABYLON.Nullable<BABYLON.Scene>, sampling?: number): AdvancedDynamicTexture;
    }
}
declare module BABYLON.GUI {
    /**
     * Root class used for all 2D controls
     * @see https://doc.babylonjs.com/how_to/gui#controls
     */
    export class Control {
        /** defines the name of the control */
        name?: string | undefined;
        /**
         * Gets or sets a boolean indicating if alpha must be an inherited value (false by default)
         */
        static AllowAlphaInheritance: boolean;
        private _alpha;
        private _alphaSet;
        private _zIndex;
        /** @hidden */
        _host: AdvancedDynamicTexture;
        /** Gets or sets the control parent */
        parent: BABYLON.Nullable<Container>;
        /** @hidden */
        _currentMeasure: Measure;
        private _fontFamily;
        private _fontStyle;
        private _fontWeight;
        private _fontSize;
        private _font;
        /** @hidden */
        _width: ValueAndUnit;
        /** @hidden */
        _height: ValueAndUnit;
        /** @hidden */
        protected _fontOffset: {
            ascent: number;
            height: number;
            descent: number;
        };
        private _color;
        private _style;
        private _styleObserver;
        /** @hidden */
        protected _horizontalAlignment: number;
        /** @hidden */
        protected _verticalAlignment: number;
        /** @hidden */
        protected _isDirty: boolean;
        /** @hidden */
        protected _wasDirty: boolean;
        /** @hidden */
        _tempParentMeasure: Measure;
        /** @hidden */
        _prevCurrentMeasureTransformedIntoGlobalSpace: Measure;
        /** @hidden */
        protected _cachedParentMeasure: Measure;
        private _paddingLeft;
        private _paddingRight;
        private _paddingTop;
        private _paddingBottom;
        /** @hidden */
        _left: ValueAndUnit;
        /** @hidden */
        _top: ValueAndUnit;
        private _scaleX;
        private _scaleY;
        private _rotation;
        private _transformCenterX;
        private _transformCenterY;
        /** @hidden */
        _transformMatrix: Matrix2D;
        /** @hidden */
        protected _invertTransformMatrix: Matrix2D;
        /** @hidden */
        protected _transformedPosition: BABYLON.Vector2;
        private _isMatrixDirty;
        private _cachedOffsetX;
        private _cachedOffsetY;
        private _isVisible;
        private _isHighlighted;
        private _highlightLineWidth;
        /** @hidden */
        _linkedMesh: BABYLON.Nullable<BABYLON.TransformNode>;
        private _fontSet;
        private _dummyVector2;
        private _downCount;
        private _enterCount;
        private _doNotRender;
        private _downPointerIds;
        protected _isEnabled: boolean;
        protected _disabledColor: string;
        protected _disabledColorItem: string;
        /** @hidden */
        protected _rebuildLayout: boolean;
        /** @hidden */
        _customData: any;
        /** @hidden */
        _isClipped: boolean;
        /** @hidden */
        _automaticSize: boolean;
        /** @hidden */
        _tag: any;
        /**
         * Gets or sets the unique id of the node. Please note that this number will be updated when the control is added to a container
         */
        uniqueId: number;
        /**
         * Gets or sets an object used to store user defined information for the node
         */
        metadata: any;
        /** Gets or sets a boolean indicating if the control can be hit with pointer events */
        isHitTestVisible: boolean;
        /** Gets or sets a boolean indicating if the control can block pointer events */
        isPointerBlocker: boolean;
        /** Gets or sets a boolean indicating if the control can be focusable */
        isFocusInvisible: boolean;
        /**
         * Gets or sets a boolean indicating if the children are clipped to the current control bounds.
         * Please note that not clipping children may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
         */
        clipChildren: boolean;
        /**
         * Gets or sets a boolean indicating that control content must be clipped
         * Please note that not clipping children may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
         */
        clipContent: boolean;
        /**
         * Gets or sets a boolean indicating that the current control should cache its rendering (useful when the control does not change often)
         */
        useBitmapCache: boolean;
        private _cacheData;
        private _shadowOffsetX;
        /** Gets or sets a value indicating the offset to apply on X axis to render the shadow */
        get shadowOffsetX(): number;
        set shadowOffsetX(value: number);
        private _shadowOffsetY;
        /** Gets or sets a value indicating the offset to apply on Y axis to render the shadow */
        get shadowOffsetY(): number;
        set shadowOffsetY(value: number);
        private _shadowBlur;
        private _previousShadowBlur;
        /** Gets or sets a value indicating the amount of blur to use to render the shadow */
        get shadowBlur(): number;
        set shadowBlur(value: number);
        private _shadowColor;
        /** Gets or sets a value indicating the color of the shadow (black by default ie. "#000") */
        get shadowColor(): string;
        set shadowColor(value: string);
        /** Gets or sets the cursor to use when the control is hovered */
        hoverCursor: string;
        /** @hidden */
        protected _linkOffsetX: ValueAndUnit;
        /** @hidden */
        protected _linkOffsetY: ValueAndUnit;
        /** Gets the control type name */
        get typeName(): string;
        /**
         * Get the current class name of the control.
         * @returns current class name
         */
        getClassName(): string;
        /**
        * An event triggered when pointer wheel is scrolled
        */
        onWheelObservable: BABYLON.Observable<BABYLON.Vector2>;
        /**
        * An event triggered when the pointer move over the control.
        */
        onPointerMoveObservable: BABYLON.Observable<BABYLON.Vector2>;
        /**
        * An event triggered when the pointer move out of the control.
        */
        onPointerOutObservable: BABYLON.Observable<Control>;
        /**
        * An event triggered when the pointer taps the control
        */
        onPointerDownObservable: BABYLON.Observable<Vector2WithInfo>;
        /**
        * An event triggered when pointer up
        */
        onPointerUpObservable: BABYLON.Observable<Vector2WithInfo>;
        /**
        * An event triggered when a control is clicked on
        */
        onPointerClickObservable: BABYLON.Observable<Vector2WithInfo>;
        /**
        * An event triggered when pointer enters the control
        */
        onPointerEnterObservable: BABYLON.Observable<Control>;
        /**
        * An event triggered when the control is marked as dirty
        */
        onDirtyObservable: BABYLON.Observable<Control>;
        /**
         * An event triggered before drawing the control
         */
        onBeforeDrawObservable: BABYLON.Observable<Control>;
        /**
         * An event triggered after the control was drawn
         */
        onAfterDrawObservable: BABYLON.Observable<Control>;
        /**
        * An event triggered when the control has been disposed
        */
        onDisposeObservable: BABYLON.Observable<Control>;
        /**
         * Get the hosting AdvancedDynamicTexture
         */
        get host(): AdvancedDynamicTexture;
        /** Gets or set information about font offsets (used to render and align text) */
        get fontOffset(): {
            ascent: number;
            height: number;
            descent: number;
        };
        set fontOffset(offset: {
            ascent: number;
            height: number;
            descent: number;
        });
        /** Gets or sets alpha value for the control (1 means opaque and 0 means entirely transparent) */
        get alpha(): number;
        set alpha(value: number);
        /**
         * Gets or sets a number indicating size of stroke we want to highlight the control with (mostly for debugging purpose)
         */
        get highlightLineWidth(): number;
        set highlightLineWidth(value: number);
        /**
         * Gets or sets a boolean indicating that we want to highlight the control (mostly for debugging purpose)
         */
        get isHighlighted(): boolean;
        set isHighlighted(value: boolean);
        /** Gets or sets a value indicating the scale factor on X axis (1 by default)
         * @see https://doc.babylonjs.com/how_to/gui#rotation-and-scaling
        */
        get scaleX(): number;
        set scaleX(value: number);
        /** Gets or sets a value indicating the scale factor on Y axis (1 by default)
         * @see https://doc.babylonjs.com/how_to/gui#rotation-and-scaling
        */
        get scaleY(): number;
        set scaleY(value: number);
        /** Gets or sets the rotation angle (0 by default)
         * @see https://doc.babylonjs.com/how_to/gui#rotation-and-scaling
        */
        get rotation(): number;
        set rotation(value: number);
        /** Gets or sets the transformation center on Y axis (0 by default)
         * @see https://doc.babylonjs.com/how_to/gui#rotation-and-scaling
        */
        get transformCenterY(): number;
        set transformCenterY(value: number);
        /** Gets or sets the transformation center on X axis (0 by default)
         * @see https://doc.babylonjs.com/how_to/gui#rotation-and-scaling
        */
        get transformCenterX(): number;
        set transformCenterX(value: number);
        /**
         * Gets or sets the horizontal alignment
         * @see https://doc.babylonjs.com/how_to/gui#alignments
         */
        get horizontalAlignment(): number;
        set horizontalAlignment(value: number);
        /**
         * Gets or sets the vertical alignment
         * @see https://doc.babylonjs.com/how_to/gui#alignments
         */
        get verticalAlignment(): number;
        set verticalAlignment(value: number);
        /**
         * Gets or sets a fixed ratio for this control.
         * When different from 0, the ratio is used to compute the "second" dimension.
         * The first dimension used in the computation is the last one set (by setting width / widthInPixels or height / heightInPixels), and the
         * second dimension is computed as first dimension * fixedRatio
         */
        fixedRatio: number;
        private _fixedRatioMasterIsWidth;
        /**
         * Gets or sets control width
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get width(): string | number;
        set width(value: string | number);
        /**
         * Gets or sets the control width in pixel
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get widthInPixels(): number;
        set widthInPixels(value: number);
        /**
         * Gets or sets control height
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get height(): string | number;
        set height(value: string | number);
        /**
         * Gets or sets control height in pixel
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get heightInPixels(): number;
        set heightInPixels(value: number);
        /** Gets or set font family */
        get fontFamily(): string;
        set fontFamily(value: string);
        /** Gets or sets font style */
        get fontStyle(): string;
        set fontStyle(value: string);
        /** Gets or sets font weight */
        get fontWeight(): string;
        set fontWeight(value: string);
        /**
         * Gets or sets style
         * @see https://doc.babylonjs.com/how_to/gui#styles
         */
        get style(): BABYLON.Nullable<Style>;
        set style(value: BABYLON.Nullable<Style>);
        /** @hidden */
        get _isFontSizeInPercentage(): boolean;
        /** Gets or sets font size in pixels */
        get fontSizeInPixels(): number;
        set fontSizeInPixels(value: number);
        /** Gets or sets font size */
        get fontSize(): string | number;
        set fontSize(value: string | number);
        /** Gets or sets foreground color */
        get color(): string;
        set color(value: string);
        /** Gets or sets z index which is used to reorder controls on the z axis */
        get zIndex(): number;
        set zIndex(value: number);
        /** Gets or sets a boolean indicating if the control can be rendered */
        get notRenderable(): boolean;
        set notRenderable(value: boolean);
        /** Gets or sets a boolean indicating if the control is visible */
        get isVisible(): boolean;
        set isVisible(value: boolean);
        /** Gets a boolean indicating that the control needs to update its rendering */
        get isDirty(): boolean;
        /**
         * Gets the current linked mesh (or null if none)
         */
        get linkedMesh(): BABYLON.Nullable<BABYLON.TransformNode>;
        /**
         * Gets or sets a value indicating the padding to use on the left of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingLeft(): string | number;
        set paddingLeft(value: string | number);
        /**
         * Gets or sets a value indicating the padding in pixels to use on the left of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingLeftInPixels(): number;
        set paddingLeftInPixels(value: number);
        /**
         * Gets or sets a value indicating the padding to use on the right of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingRight(): string | number;
        set paddingRight(value: string | number);
        /**
         * Gets or sets a value indicating the padding in pixels to use on the right of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingRightInPixels(): number;
        set paddingRightInPixels(value: number);
        /**
         * Gets or sets a value indicating the padding to use on the top of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingTop(): string | number;
        set paddingTop(value: string | number);
        /**
         * Gets or sets a value indicating the padding in pixels to use on the top of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingTopInPixels(): number;
        set paddingTopInPixels(value: number);
        /**
         * Gets or sets a value indicating the padding to use on the bottom of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingBottom(): string | number;
        set paddingBottom(value: string | number);
        /**
         * Gets or sets a value indicating the padding in pixels to use on the bottom of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get paddingBottomInPixels(): number;
        set paddingBottomInPixels(value: number);
        /**
         * Gets or sets a value indicating the left coordinate of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get left(): string | number;
        set left(value: string | number);
        /**
         * Gets or sets a value indicating the left coordinate in pixels of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get leftInPixels(): number;
        set leftInPixels(value: number);
        /**
         * Gets or sets a value indicating the top coordinate of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get top(): string | number;
        set top(value: string | number);
        /**
         * Gets or sets a value indicating the top coordinate in pixels of the control
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get topInPixels(): number;
        set topInPixels(value: number);
        /**
         * Gets or sets a value indicating the offset on X axis to the linked mesh
         * @see https://doc.babylonjs.com/how_to/gui#tracking-positions
         */
        get linkOffsetX(): string | number;
        set linkOffsetX(value: string | number);
        /**
         * Gets or sets a value indicating the offset in pixels on X axis to the linked mesh
         * @see https://doc.babylonjs.com/how_to/gui#tracking-positions
         */
        get linkOffsetXInPixels(): number;
        set linkOffsetXInPixels(value: number);
        /**
         * Gets or sets a value indicating the offset on Y axis to the linked mesh
         * @see https://doc.babylonjs.com/how_to/gui#tracking-positions
         */
        get linkOffsetY(): string | number;
        set linkOffsetY(value: string | number);
        /**
         * Gets or sets a value indicating the offset in pixels on Y axis to the linked mesh
         * @see https://doc.babylonjs.com/how_to/gui#tracking-positions
         */
        get linkOffsetYInPixels(): number;
        set linkOffsetYInPixels(value: number);
        /** Gets the center coordinate on X axis */
        get centerX(): number;
        /** Gets the center coordinate on Y axis */
        get centerY(): number;
        /** Gets or sets if control is Enabled */
        get isEnabled(): boolean;
        set isEnabled(value: boolean);
        /** Gets or sets background color of control if it's disabled */
        get disabledColor(): string;
        set disabledColor(value: string);
        /** Gets or sets front color of control if it's disabled */
        get disabledColorItem(): string;
        set disabledColorItem(value: string);
        /**
         * Creates a new control
         * @param name defines the name of the control
         */
        constructor(
        /** defines the name of the control */
        name?: string | undefined);
        /** @hidden */
        protected _getTypeName(): string;
        /**
         * Gets the first ascendant in the hierarchy of the given type
         * @param className defines the required type
         * @returns the ascendant or null if not found
         */
        getAscendantOfClass(className: string): BABYLON.Nullable<Control>;
        /** @hidden */
        _resetFontCache(): void;
        /**
         * Determines if a container is an ascendant of the current control
         * @param container defines the container to look for
         * @returns true if the container is one of the ascendant of the control
         */
        isAscendant(container: Control): boolean;
        /**
         * Gets coordinates in local control space
         * @param globalCoordinates defines the coordinates to transform
         * @returns the new coordinates in local space
         */
        getLocalCoordinates(globalCoordinates: BABYLON.Vector2): BABYLON.Vector2;
        /**
         * Gets coordinates in local control space
         * @param globalCoordinates defines the coordinates to transform
         * @param result defines the target vector2 where to store the result
         * @returns the current control
         */
        getLocalCoordinatesToRef(globalCoordinates: BABYLON.Vector2, result: BABYLON.Vector2): Control;
        /**
         * Gets coordinates in parent local control space
         * @param globalCoordinates defines the coordinates to transform
         * @returns the new coordinates in parent local space
         */
        getParentLocalCoordinates(globalCoordinates: BABYLON.Vector2): BABYLON.Vector2;
        /**
         * Move the current control to a vector3 position projected onto the screen.
         * @param position defines the target position
         * @param scene defines the hosting scene
         */
        moveToVector3(position: BABYLON.Vector3, scene: BABYLON.Scene): void;
        /**
         * Will store all controls that have this control as ascendant in a given array
         * @param results defines the array where to store the descendants
         * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
         * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
         */
        getDescendantsToRef(results: Control[], directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): void;
        /**
         * Will return all controls that have this control as ascendant
         * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
         * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
         * @return all child controls
         */
        getDescendants(directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): Control[];
        /**
         * Link current control with a target mesh
         * @param mesh defines the mesh to link with
         * @see https://doc.babylonjs.com/how_to/gui#tracking-positions
         */
        linkWithMesh(mesh: BABYLON.Nullable<BABYLON.TransformNode>): void;
        /**
        * Shorthand funtion to set the top, right, bottom, and left padding values on the control.
        * @param { string | number} paddingTop - The value of the top padding.
        * @param { string | number} paddingRight - The value of the right padding. If omitted, top is used.
        * @param { string | number} paddingBottom - The value of the bottom padding. If omitted, top is used.
        * @param { string | number} paddingLeft - The value of the left padding. If omitted, right is used.
        * @see https://doc.babylonjs.com/how_to/gui#position-and-size
        */
        setPadding(paddingTop: string | number, paddingRight?: string | number, paddingBottom?: string | number, paddingLeft?: string | number): void;
        /**
         * Shorthand funtion to set the top, right, bottom, and left padding values in pixels on the control.
         * @param { number} paddingTop - The value in pixels of the top padding.
         * @param { number} paddingRight - The value in pixels of the right padding. If omitted, top is used.
         * @param { number} paddingBottom - The value in pixels of the bottom padding. If omitted, top is used.
         * @param { number} paddingLeft - The value in pixels of the left padding. If omitted, right is used.
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        setPaddingInPixels(paddingTop: number, paddingRight?: number, paddingBottom?: number, paddingLeft?: number): void;
        /** @hidden */
        _moveToProjectedPosition(projectedPosition: BABYLON.Vector3): void;
        /** @hidden */
        _offsetLeft(offset: number): void;
        /** @hidden */
        _offsetTop(offset: number): void;
        /** @hidden */
        _markMatrixAsDirty(): void;
        /** @hidden */
        _flagDescendantsAsMatrixDirty(): void;
        /** @hidden */
        _intersectsRect(rect: Measure): boolean;
        /** @hidden */
        protected invalidateRect(): void;
        /** @hidden */
        _markAsDirty(force?: boolean): void;
        /** @hidden */
        _markAllAsDirty(): void;
        /** @hidden */
        _link(host: AdvancedDynamicTexture): void;
        /** @hidden */
        protected _transform(context?: CanvasRenderingContext2D): void;
        /** @hidden */
        _renderHighlight(context: CanvasRenderingContext2D): void;
        /** @hidden */
        _renderHighlightSpecific(context: CanvasRenderingContext2D): void;
        /** @hidden */
        protected _applyStates(context: CanvasRenderingContext2D): void;
        /** @hidden */
        _layout(parentMeasure: Measure, context: CanvasRenderingContext2D): boolean;
        /** @hidden */
        protected _processMeasures(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        protected _evaluateClippingState(parentMeasure: Measure): void;
        /** @hidden */
        _measure(): void;
        /** @hidden */
        protected _computeAlignment(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /** @hidden */
        protected _preMeasure(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /** @hidden */
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /** @hidden */
        protected _clipForChildren(context: CanvasRenderingContext2D): void;
        private static _ClipMeasure;
        private _tmpMeasureA;
        private _clip;
        /** @hidden */
        _render(context: CanvasRenderingContext2D, invalidatedRectangle?: BABYLON.Nullable<Measure>): boolean;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: BABYLON.Nullable<Measure>): void;
        /**
         * Tests if a given coordinates belong to the current control
         * @param x defines x coordinate to test
         * @param y defines y coordinate to test
         * @returns true if the coordinates are inside the control
         */
        contains(x: number, y: number): boolean;
        /** @hidden */
        _processPicking(x: number, y: number, pi: BABYLON.PointerInfoBase, type: number, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
        /** @hidden */
        _onPointerMove(target: Control, coordinates: BABYLON.Vector2, pointerId: number, pi: BABYLON.PointerInfoBase): void;
        /** @hidden */
        _onPointerEnter(target: Control, pi: BABYLON.PointerInfoBase): boolean;
        /** @hidden */
        _onPointerOut(target: Control, pi: BABYLON.Nullable<BABYLON.PointerInfoBase>, force?: boolean): void;
        /** @hidden */
        _onPointerDown(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, pi: BABYLON.PointerInfoBase): boolean;
        /** @hidden */
        _onPointerUp(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi?: BABYLON.PointerInfoBase): void;
        /** @hidden */
        _forcePointerUp(pointerId?: BABYLON.Nullable<number>): void;
        /** @hidden */
        _onWheelScroll(deltaX?: number, deltaY?: number): void;
        /** @hidden */
        _onCanvasBlur(): void;
        /** @hidden */
        _processObservables(type: number, x: number, y: number, pi: BABYLON.PointerInfoBase, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
        private _prepareFont;
        /**
         * Serializes the current control
         * @param serializationObject defined the JSON serialized object
         */
        serialize(serializationObject: any): void;
        /** @hidden */
        _parseFromContent(serializedObject: any, host: AdvancedDynamicTexture): void;
        /** Releases associated resources */
        dispose(): void;
        private static _HORIZONTAL_ALIGNMENT_LEFT;
        private static _HORIZONTAL_ALIGNMENT_RIGHT;
        private static _HORIZONTAL_ALIGNMENT_CENTER;
        private static _VERTICAL_ALIGNMENT_TOP;
        private static _VERTICAL_ALIGNMENT_BOTTOM;
        private static _VERTICAL_ALIGNMENT_CENTER;
        /** HORIZONTAL_ALIGNMENT_LEFT */
        static get HORIZONTAL_ALIGNMENT_LEFT(): number;
        /** HORIZONTAL_ALIGNMENT_RIGHT */
        static get HORIZONTAL_ALIGNMENT_RIGHT(): number;
        /** HORIZONTAL_ALIGNMENT_CENTER */
        static get HORIZONTAL_ALIGNMENT_CENTER(): number;
        /** VERTICAL_ALIGNMENT_TOP */
        static get VERTICAL_ALIGNMENT_TOP(): number;
        /** VERTICAL_ALIGNMENT_BOTTOM */
        static get VERTICAL_ALIGNMENT_BOTTOM(): number;
        /** VERTICAL_ALIGNMENT_CENTER */
        static get VERTICAL_ALIGNMENT_CENTER(): number;
        private static _FontHeightSizes;
        /** @hidden */
        static _GetFontOffset(font: string): {
            ascent: number;
            height: number;
            descent: number;
        };
        /**
         * Creates a Control from parsed data
         * @param serializedObject defines parsed data
         * @param host defines the hosting AdvancedDynamicTexture
         * @returns a new Control
         */
        static Parse(serializedObject: any, host: AdvancedDynamicTexture): Control;
        /**
         * Creates a stack panel that can be used to render headers
         * @param control defines the control to associate with the header
         * @param text defines the text of the header
         * @param size defines the size of the header
         * @param options defines options used to configure the header
         * @returns a new StackPanel
         * @ignore
         * @hidden
         */
        static AddHeader: (control: Control, text: string, size: string | number, options: {
            isHorizontal: boolean;
            controlFirst: boolean;
        }) => any;
        /** @hidden */
        protected static drawEllipse(x: number, y: number, width: number, height: number, context: CanvasRenderingContext2D): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Root class for 2D containers
     * @see https://doc.babylonjs.com/how_to/gui#containers
     */
    export class Container extends Control {
        name?: string | undefined;
        /** @hidden */
        _children: Control[];
        /** @hidden */
        protected _measureForChildren: Measure;
        /** @hidden */
        protected _background: string;
        /** @hidden */
        protected _adaptWidthToChildren: boolean;
        /** @hidden */
        protected _adaptHeightToChildren: boolean;
        /** @hidden */
        protected _renderToIntermediateTexture: boolean;
        /** @hidden */
        protected _intermediateTexture: BABYLON.Nullable<BABYLON.DynamicTexture>;
        /** Gets or sets boolean indicating if children should be rendered to an intermediate texture rather than directly to host, useful for alpha blending */
        get renderToIntermediateTexture(): boolean;
        set renderToIntermediateTexture(value: boolean);
        /**
         * Gets or sets a boolean indicating that layout cycle errors should be displayed on the console
         */
        logLayoutCycleErrors: boolean;
        /**
         * Gets or sets the number of layout cycles (a change involved by a control while evaluating the layout) allowed
         */
        maxLayoutCycle: number;
        /** Gets or sets a boolean indicating if the container should try to adapt to its children height */
        get adaptHeightToChildren(): boolean;
        set adaptHeightToChildren(value: boolean);
        /** Gets or sets a boolean indicating if the container should try to adapt to its children width */
        get adaptWidthToChildren(): boolean;
        set adaptWidthToChildren(value: boolean);
        /** Gets or sets background color */
        get background(): string;
        set background(value: string);
        /** Gets the list of children */
        get children(): Control[];
        /**
         * Creates a new Container
         * @param name defines the name of the container
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        _flagDescendantsAsMatrixDirty(): void;
        /**
         * Gets a child using its name
         * @param name defines the child name to look for
         * @returns the child control if found
         */
        getChildByName(name: string): BABYLON.Nullable<Control>;
        /**
         * Gets a child using its type and its name
         * @param name defines the child name to look for
         * @param type defines the child type to look for
         * @returns the child control if found
         */
        getChildByType(name: string, type: string): BABYLON.Nullable<Control>;
        /**
         * Search for a specific control in children
         * @param control defines the control to look for
         * @returns true if the control is in child list
         */
        containsControl(control: Control): boolean;
        /**
         * Adds a new control to the current container
         * @param control defines the control to add
         * @returns the current container
         */
        addControl(control: BABYLON.Nullable<Control>): Container;
        /**
         * Removes all controls from the current container
         * @returns the current container
         */
        clearControls(): Container;
        /**
         * Removes a control from the current container
         * @param control defines the control to remove
         * @returns the current container
         */
        removeControl(control: Control): Container;
        /** @hidden */
        _reOrderControl(control: Control): void;
        /** @hidden */
        _offsetLeft(offset: number): void;
        /** @hidden */
        _offsetTop(offset: number): void;
        /** @hidden */
        _markAllAsDirty(): void;
        /** @hidden */
        protected _localDraw(context: CanvasRenderingContext2D): void;
        /** @hidden */
        _link(host: AdvancedDynamicTexture): void;
        /** @hidden */
        protected _beforeLayout(): void;
        /** @hidden */
        protected _processMeasures(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /** @hidden */
        _layout(parentMeasure: Measure, context: CanvasRenderingContext2D): boolean;
        protected _postMeasure(): void;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Measure): void;
        getDescendantsToRef(results: Control[], directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): void;
        /** @hidden */
        _processPicking(x: number, y: number, pi: BABYLON.PointerInfoBase, type: number, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
        /** @hidden */
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /**
        * Serializes the current control
        * @param serializationObject defined the JSON serialized object
        */
        serialize(serializationObject: any): void;
        /** Releases associated resources */
        dispose(): void;
        /** @hidden */
        _parseFromContent(serializedObject: any, host: AdvancedDynamicTexture): void;
    }
}
declare module BABYLON.GUI {
    /** Class used to create rectangle container */
    export class Rectangle extends Container {
        name?: string | undefined;
        private _thickness;
        private _cornerRadius;
        /** Gets or sets border thickness */
        get thickness(): number;
        set thickness(value: number);
        /** Gets or sets the corner radius angle */
        get cornerRadius(): number;
        set cornerRadius(value: number);
        /**
         * Creates a new Rectangle
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _localDraw(context: CanvasRenderingContext2D): void;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        private _drawRoundedRect;
        protected _clipForChildren(context: CanvasRenderingContext2D): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Enum that determines the text-wrapping mode to use.
     */
    export enum TextWrapping {
        /**
         * Clip the text when it's larger than Control.width; this is the default mode.
         */
        Clip = 0,
        /**
         * Wrap the text word-wise, i.e. try to add line-breaks at word boundary to fit within Control.width.
         */
        WordWrap = 1,
        /**
         * Ellipsize the text, i.e. shrink with trailing … when text is larger than Control.width.
         */
        Ellipsis = 2
    }
    /**
     * Class used to create text block control
     */
    export class TextBlock extends Control {
        /**
         * Defines the name of the control
         */
        name?: string | undefined;
        private _text;
        private _textWrapping;
        private _textHorizontalAlignment;
        private _textVerticalAlignment;
        private _lines;
        private _resizeToFit;
        private _lineSpacing;
        private _outlineWidth;
        private _outlineColor;
        private _underline;
        private _lineThrough;
        /**
         * An event triggered after the text is changed
         */
        onTextChangedObservable: BABYLON.Observable<TextBlock>;
        /**
         * An event triggered after the text was broken up into lines
         */
        onLinesReadyObservable: BABYLON.Observable<TextBlock>;
        /**
         * Function used to split a string into words. By default, a string is split at each space character found
         */
        wordSplittingFunction: BABYLON.Nullable<(line: string) => string[]>;
        /**
         * Return the line list (you may need to use the onLinesReadyObservable to make sure the list is ready)
         */
        get lines(): any[];
        /**
         * Gets or sets an boolean indicating that the TextBlock will be resized to fit container
         */
        get resizeToFit(): boolean;
        /**
         * Gets or sets an boolean indicating that the TextBlock will be resized to fit container
         */
        set resizeToFit(value: boolean);
        /**
         * Gets or sets a boolean indicating if text must be wrapped
         */
        get textWrapping(): TextWrapping | boolean;
        /**
         * Gets or sets a boolean indicating if text must be wrapped
         */
        set textWrapping(value: TextWrapping | boolean);
        /**
         * Gets or sets text to display
         */
        get text(): string;
        /**
         * Gets or sets text to display
         */
        set text(value: string);
        /**
         * Gets or sets text horizontal alignment (BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER by default)
         */
        get textHorizontalAlignment(): number;
        /**
         * Gets or sets text horizontal alignment (BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER by default)
         */
        set textHorizontalAlignment(value: number);
        /**
         * Gets or sets text vertical alignment (BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER by default)
         */
        get textVerticalAlignment(): number;
        /**
         * Gets or sets text vertical alignment (BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER by default)
         */
        set textVerticalAlignment(value: number);
        /**
         * Gets or sets line spacing value
         */
        set lineSpacing(value: string | number);
        /**
         * Gets or sets line spacing value
         */
        get lineSpacing(): string | number;
        /**
         * Gets or sets outlineWidth of the text to display
         */
        get outlineWidth(): number;
        /**
         * Gets or sets outlineWidth of the text to display
         */
        set outlineWidth(value: number);
        /**
         * Gets or sets a boolean indicating that text must have underline
         */
        get underline(): boolean;
        /**
         * Gets or sets a boolean indicating that text must have underline
         */
        set underline(value: boolean);
        /**
         * Gets or sets an boolean indicating that text must be crossed out
         */
        get lineThrough(): boolean;
        /**
         * Gets or sets an boolean indicating that text must be crossed out
         */
        set lineThrough(value: boolean);
        /**
         * Gets or sets outlineColor of the text to display
         */
        get outlineColor(): string;
        /**
         * Gets or sets outlineColor of the text to display
         */
        set outlineColor(value: string);
        /**
         * Creates a new TextBlock object
         * @param name defines the name of the control
         * @param text defines the text to display (emptry string by default)
         */
        constructor(
        /**
         * Defines the name of the control
         */
        name?: string | undefined, text?: string);
        protected _getTypeName(): string;
        protected _processMeasures(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        private _drawText;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: BABYLON.Nullable<Measure>): void;
        protected _applyStates(context: CanvasRenderingContext2D): void;
        protected _breakLines(refWidth: number, context: CanvasRenderingContext2D): object[];
        protected _parseLine(line: string | undefined, context: CanvasRenderingContext2D): object;
        protected _parseLineEllipsis(line: string | undefined, width: number, context: CanvasRenderingContext2D): object;
        protected _parseLineWordWrap(line: string | undefined, width: number, context: CanvasRenderingContext2D): object[];
        protected _renderLines(context: CanvasRenderingContext2D): void;
        /**
         * Given a width constraint applied on the text block, find the expected height
         * @returns expected height
         */
        computeExpectedHeight(): number;
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create 2D images
     */
    export class Image extends Control {
        name?: string | undefined;
        private _workingCanvas;
        private _domImage;
        private _imageWidth;
        private _imageHeight;
        private _loaded;
        private _stretch;
        private _source;
        private _autoScale;
        private _sourceLeft;
        private _sourceTop;
        private _sourceWidth;
        private _sourceHeight;
        private _svgAttributesComputationCompleted;
        private _isSVG;
        private _cellWidth;
        private _cellHeight;
        private _cellId;
        private _sliceLeft;
        private _sliceRight;
        private _sliceTop;
        private _sliceBottom;
        private _populateNinePatchSlicesFromImage;
        private _detectPointerOnOpaqueOnly;
        private _imageDataCache;
        /**
         * BABYLON.Observable notified when the content is loaded
         */
        onImageLoadedObservable: BABYLON.Observable<Image>;
        /**
         * BABYLON.Observable notified when _sourceLeft, _sourceTop, _sourceWidth and _sourceHeight are computed
         */
        onSVGAttributesComputedObservable: BABYLON.Observable<Image>;
        /**
         * Gets a boolean indicating that the content is loaded
         */
        get isLoaded(): boolean;
        /**
         * Gets or sets a boolean indicating if pointers should only be validated on pixels with alpha > 0.
         * Beware using this as this will comsume more memory as the image has to be stored twice
         */
        get detectPointerOnOpaqueOnly(): boolean;
        set detectPointerOnOpaqueOnly(value: boolean);
        /**
         * Gets or sets the left value for slicing (9-patch)
         */
        get sliceLeft(): number;
        set sliceLeft(value: number);
        /**
         * Gets or sets the right value for slicing (9-patch)
         */
        get sliceRight(): number;
        set sliceRight(value: number);
        /**
         * Gets or sets the top value for slicing (9-patch)
         */
        get sliceTop(): number;
        set sliceTop(value: number);
        /**
         * Gets or sets the bottom value for slicing (9-patch)
         */
        get sliceBottom(): number;
        set sliceBottom(value: number);
        /**
         * Gets or sets the left coordinate in the source image
         */
        get sourceLeft(): number;
        set sourceLeft(value: number);
        /**
         * Gets or sets the top coordinate in the source image
         */
        get sourceTop(): number;
        set sourceTop(value: number);
        /**
         * Gets or sets the width to capture in the source image
         */
        get sourceWidth(): number;
        set sourceWidth(value: number);
        /**
         * Gets or sets the height to capture in the source image
         */
        get sourceHeight(): number;
        set sourceHeight(value: number);
        /**
         * Gets the image width
         */
        get imageWidth(): number;
        /**
         * Gets the image height
         */
        get imageHeight(): number;
        /**
        * Gets or sets a boolean indicating if nine patch slices (left, top, right, bottom) should be read from image data
        */
        get populateNinePatchSlicesFromImage(): boolean;
        set populateNinePatchSlicesFromImage(value: boolean);
        /** Indicates if the format of the image is SVG */
        get isSVG(): boolean;
        /** Gets the status of the SVG attributes computation (sourceLeft, sourceTop, sourceWidth, sourceHeight) */
        get svgAttributesComputationCompleted(): boolean;
        /**
         * Gets or sets a boolean indicating if the image can force its container to adapt its size
         * @see https://doc.babylonjs.com/how_to/gui#image
         */
        get autoScale(): boolean;
        set autoScale(value: boolean);
        /** Gets or sets the streching mode used by the image */
        get stretch(): number;
        set stretch(value: number);
        /** @hidden */
        _rotate90(n: number, preserveProperties?: boolean): Image;
        private _handleRotationForSVGImage;
        private _rotate90SourceProperties;
        private _extractNinePatchSliceDataFromImage;
        /**
         * Gets or sets the internal DOM image used to render the control
         */
        set domImage(value: HTMLImageElement);
        get domImage(): HTMLImageElement;
        private _onImageLoaded;
        /**
         * Gets the image source url
         */
        get source(): BABYLON.Nullable<string>;
        /**
         * Gets or sets image source url
         */
        set source(value: BABYLON.Nullable<string>);
        /**
         * Checks for svg document with icon id present
         */
        private _svgCheck;
        /**
         * Sets sourceLeft, sourceTop, sourceWidth, sourceHeight automatically
         * given external svg file and icon id
         */
        private _getSVGAttribs;
        /**
         * Gets or sets the cell width to use when animation sheet is enabled
         * @see https://doc.babylonjs.com/how_to/gui#image
         */
        get cellWidth(): number;
        set cellWidth(value: number);
        /**
         * Gets or sets the cell height to use when animation sheet is enabled
         * @see https://doc.babylonjs.com/how_to/gui#image
         */
        get cellHeight(): number;
        set cellHeight(value: number);
        /**
         * Gets or sets the cell id to use (this will turn on the animation sheet mode)
         * @see https://doc.babylonjs.com/how_to/gui#image
         */
        get cellId(): number;
        set cellId(value: number);
        /**
         * Creates a new Image
         * @param name defines the control name
         * @param url defines the image url
         */
        constructor(name?: string | undefined, url?: BABYLON.Nullable<string>);
        /**
         * Tests if a given coordinates belong to the current control
         * @param x defines x coordinate to test
         * @param y defines y coordinate to test
         * @returns true if the coordinates are inside the control
         */
        contains(x: number, y: number): boolean;
        protected _getTypeName(): string;
        /** Force the control to synchronize with its content */
        synchronizeSizeWithContent(): void;
        protected _processMeasures(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        private _prepareWorkingCanvasForOpaqueDetection;
        private _drawImage;
        _draw(context: CanvasRenderingContext2D): void;
        private _renderNinePatch;
        dispose(): void;
        /** STRETCH_NONE */
        static readonly STRETCH_NONE: number;
        /** STRETCH_FILL */
        static readonly STRETCH_FILL: number;
        /** STRETCH_UNIFORM */
        static readonly STRETCH_UNIFORM: number;
        /** STRETCH_EXTEND */
        static readonly STRETCH_EXTEND: number;
        /** NINE_PATCH */
        static readonly STRETCH_NINE_PATCH: number;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create 2D buttons
     */
    export class Button extends Rectangle {
        name?: string | undefined;
        /**
         * Function called to generate a pointer enter animation
         */
        pointerEnterAnimation: () => void;
        /**
         * Function called to generate a pointer out animation
         */
        pointerOutAnimation: () => void;
        /**
         * Function called to generate a pointer down animation
         */
        pointerDownAnimation: () => void;
        /**
         * Function called to generate a pointer up animation
         */
        pointerUpAnimation: () => void;
        /**
         * Gets or sets a boolean indicating that the button will let internal controls handle picking instead of doing it directly using its bounding info
         */
        delegatePickingToChildren: boolean;
        private _image;
        /**
         * Returns the image part of the button (if any)
         */
        get image(): BABYLON.Nullable<Image>;
        private _textBlock;
        /**
         * Returns the image part of the button (if any)
         */
        get textBlock(): BABYLON.Nullable<TextBlock>;
        /**
         * Creates a new Button
         * @param name defines the name of the button
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        /** @hidden */
        _processPicking(x: number, y: number, pi: BABYLON.PointerInfoBase, type: number, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
        /** @hidden */
        _onPointerEnter(target: Control, pi: BABYLON.PointerInfoBase): boolean;
        /** @hidden */
        _onPointerOut(target: Control, pi: BABYLON.PointerInfoBase, force?: boolean): void;
        /** @hidden */
        _onPointerDown(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, pi: BABYLON.PointerInfoBase): boolean;
        /** @hidden */
        _onPointerUp(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi: BABYLON.PointerInfoBase): void;
        /**
         * Creates a new button made with an image and a text
         * @param name defines the name of the button
         * @param text defines the text of the button
         * @param imageUrl defines the url of the image
         * @returns a new Button
         */
        static CreateImageButton(name: string, text: string, imageUrl: string): Button;
        /**
         * Creates a new button made with an image
         * @param name defines the name of the button
         * @param imageUrl defines the url of the image
         * @returns a new Button
         */
        static CreateImageOnlyButton(name: string, imageUrl: string): Button;
        /**
         * Creates a new button made with a text
         * @param name defines the name of the button
         * @param text defines the text of the button
         * @returns a new Button
         */
        static CreateSimpleButton(name: string, text: string): Button;
        /**
         * Creates a new button made with an image and a centered text
         * @param name defines the name of the button
         * @param text defines the text of the button
         * @param imageUrl defines the url of the image
         * @returns a new Button
         */
        static CreateImageWithCenterTextButton(name: string, text: string, imageUrl: string): Button;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a 2D stack panel container
     */
    export class StackPanel extends Container {
        name?: string | undefined;
        private _isVertical;
        private _manualWidth;
        private _manualHeight;
        private _doNotTrackManualChanges;
        /**
         * Gets or sets a boolean indicating that layou warnings should be ignored
         */
        ignoreLayoutWarnings: boolean;
        /** Gets or sets a boolean indicating if the stack panel is vertical or horizontal*/
        get isVertical(): boolean;
        set isVertical(value: boolean);
        /**
         * Gets or sets panel width.
         * This value should not be set when in horizontal mode as it will be computed automatically
         */
        set width(value: string | number);
        get width(): string | number;
        /**
         * Gets or sets panel height.
         * This value should not be set when in vertical mode as it will be computed automatically
         */
        set height(value: string | number);
        get height(): string | number;
        /**
         * Creates a new StackPanel
         * @param name defines control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        /** @hidden */
        protected _preMeasure(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        protected _postMeasure(): void;
        /**
         * Serializes the current control
         * @param serializationObject defined the JSON serialized object
         */
        serialize(serializationObject: any): void;
        /** @hidden */
        _parseFromContent(serializedObject: any, host: AdvancedDynamicTexture): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to represent a 2D checkbox
     */
    export class Checkbox extends Control {
        name?: string | undefined;
        private _isChecked;
        private _background;
        private _checkSizeRatio;
        private _thickness;
        /** Gets or sets border thickness  */
        get thickness(): number;
        set thickness(value: number);
        /**
         * BABYLON.Observable raised when isChecked property changes
         */
        onIsCheckedChangedObservable: BABYLON.Observable<boolean>;
        /** Gets or sets a value indicating the ratio between overall size and check size */
        get checkSizeRatio(): number;
        set checkSizeRatio(value: number);
        /** Gets or sets background color */
        get background(): string;
        set background(value: string);
        /** Gets or sets a boolean indicating if the checkbox is checked or not */
        get isChecked(): boolean;
        set isChecked(value: boolean);
        /**
         * Creates a new CheckBox
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: BABYLON.Nullable<Measure>): void;
        /** @hidden */
        _onPointerDown(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, pi: BABYLON.PointerInfoBase): boolean;
        /**
         * Utility function to easily create a checkbox with a header
         * @param title defines the label to use for the header
         * @param onValueChanged defines the callback to call when value changes
         * @returns a StackPanel containing the checkbox and a textBlock
         */
        static AddCheckBoxWithHeader(title: string, onValueChanged: (value: boolean) => void): StackPanel;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to store key control properties
     */
    export class KeyPropertySet {
        /** Width */
        width?: string;
        /** Height */
        height?: string;
        /** Left padding */
        paddingLeft?: string;
        /** Right padding */
        paddingRight?: string;
        /** Top padding */
        paddingTop?: string;
        /** Bottom padding */
        paddingBottom?: string;
        /** Foreground color */
        color?: string;
        /** Background color */
        background?: string;
    }
    /**
     * Class used to create virtual keyboard
     */
    export class VirtualKeyboard extends StackPanel {
        /** BABYLON.Observable raised when a key is pressed */
        onKeyPressObservable: BABYLON.Observable<string>;
        /** Gets or sets default key button width */
        defaultButtonWidth: string;
        /** Gets or sets default key button height */
        defaultButtonHeight: string;
        /** Gets or sets default key button left padding */
        defaultButtonPaddingLeft: string;
        /** Gets or sets default key button right padding */
        defaultButtonPaddingRight: string;
        /** Gets or sets default key button top padding */
        defaultButtonPaddingTop: string;
        /** Gets or sets default key button bottom padding */
        defaultButtonPaddingBottom: string;
        /** Gets or sets default key button foreground color */
        defaultButtonColor: string;
        /** Gets or sets default key button background color */
        defaultButtonBackground: string;
        /** Gets or sets shift button foreground color */
        shiftButtonColor: string;
        /** Gets or sets shift button thickness*/
        selectedShiftThickness: number;
        /** Gets shift key state */
        shiftState: number;
        protected _getTypeName(): string;
        private _createKey;
        /**
         * Adds a new row of keys
         * @param keys defines the list of keys to add
         * @param propertySets defines the associated property sets
         */
        addKeysRow(keys: Array<string>, propertySets?: Array<KeyPropertySet>): void;
        /**
         * Set the shift key to a specific state
         * @param shiftState defines the new shift state
         */
        applyShiftState(shiftState: number): void;
        private _currentlyConnectedInputText;
        private _connectedInputTexts;
        private _onKeyPressObserver;
        /** Gets the input text control currently attached to the keyboard */
        get connectedInputText(): BABYLON.Nullable<InputText>;
        /**
         * Connects the keyboard with an input text control
         *
         * @param input defines the target control
         */
        connect(input: InputText): void;
        /**
         * Disconnects the keyboard from connected InputText controls
         *
         * @param input optionally defines a target control, otherwise all are disconnected
         */
        disconnect(input?: InputText): void;
        private _removeConnectedInputObservables;
        /**
         * Release all resources
         */
        dispose(): void;
        /**
         * Creates a new keyboard using a default layout
         *
         * @param name defines control name
         * @returns a new VirtualKeyboard
         */
        static CreateDefaultLayout(name?: string): VirtualKeyboard;
    }
}
declare module BABYLON.GUI {
    /** @hidden */
    export class TextWrapper {
        private _text;
        private _characters;
        get text(): string;
        set text(txt: string);
        get length(): number;
        removePart(idxStart: number, idxEnd: number, insertTxt?: string): void;
        charAt(idx: number): string;
        substr(from: number, length?: number): string;
        substring(from: number, to?: number): string;
        isWord(index: number): boolean;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create input text control
     */
    export class InputText extends Control implements IFocusableControl {
        name?: string | undefined;
        private _textWrapper;
        private _placeholderText;
        private _background;
        private _focusedBackground;
        private _focusedColor;
        private _placeholderColor;
        private _thickness;
        private _margin;
        private _autoStretchWidth;
        private _maxWidth;
        private _isFocused;
        private _blinkTimeout;
        private _blinkIsEven;
        private _cursorOffset;
        private _scrollLeft;
        private _textWidth;
        private _clickedCoordinate;
        private _deadKey;
        private _addKey;
        private _currentKey;
        private _isTextHighlightOn;
        private _textHighlightColor;
        private _highligherOpacity;
        private _highlightedText;
        private _startHighlightIndex;
        private _endHighlightIndex;
        private _cursorIndex;
        private _onFocusSelectAll;
        private _isPointerDown;
        private _onClipboardObserver;
        private _onPointerDblTapObserver;
        /** @hidden */
        _connectedVirtualKeyboard: BABYLON.Nullable<VirtualKeyboard>;
        /** Gets or sets a string representing the message displayed on mobile when the control gets the focus */
        promptMessage: string;
        /** Force disable prompt on mobile device */
        disableMobilePrompt: boolean;
        /** BABYLON.Observable raised when the text changes */
        onTextChangedObservable: BABYLON.Observable<InputText>;
        /** BABYLON.Observable raised just before an entered character is to be added */
        onBeforeKeyAddObservable: BABYLON.Observable<InputText>;
        /** BABYLON.Observable raised when the control gets the focus */
        onFocusObservable: BABYLON.Observable<InputText>;
        /** BABYLON.Observable raised when the control loses the focus */
        onBlurObservable: BABYLON.Observable<InputText>;
        /**Observable raised when the text is highlighted */
        onTextHighlightObservable: BABYLON.Observable<InputText>;
        /**Observable raised when copy event is triggered */
        onTextCopyObservable: BABYLON.Observable<InputText>;
        /** BABYLON.Observable raised when cut event is triggered */
        onTextCutObservable: BABYLON.Observable<InputText>;
        /** BABYLON.Observable raised when paste event is triggered */
        onTextPasteObservable: BABYLON.Observable<InputText>;
        /** BABYLON.Observable raised when a key event was processed */
        onKeyboardEventProcessedObservable: BABYLON.Observable<BABYLON.IKeyboardEvent>;
        /** Gets or sets the maximum width allowed by the control */
        get maxWidth(): string | number;
        /** Gets the maximum width allowed by the control in pixels */
        get maxWidthInPixels(): number;
        set maxWidth(value: string | number);
        /** Gets or sets the text highlighter transparency; default: 0.4 */
        get highligherOpacity(): number;
        set highligherOpacity(value: number);
        /** Gets or sets a boolean indicating whether to select complete text by default on input focus */
        get onFocusSelectAll(): boolean;
        set onFocusSelectAll(value: boolean);
        /** Gets or sets the text hightlight color */
        get textHighlightColor(): string;
        set textHighlightColor(value: string);
        /** Gets or sets control margin */
        get margin(): string;
        /** Gets control margin in pixels */
        get marginInPixels(): number;
        set margin(value: string);
        /** Gets or sets a boolean indicating if the control can auto stretch its width to adapt to the text */
        get autoStretchWidth(): boolean;
        set autoStretchWidth(value: boolean);
        /** Gets or sets border thickness */
        get thickness(): number;
        set thickness(value: number);
        /** Gets or sets the background color when focused */
        get focusedBackground(): string;
        set focusedBackground(value: string);
        /** Gets or sets the background color when focused */
        get focusedColor(): string;
        set focusedColor(value: string);
        /** Gets or sets the background color */
        get background(): string;
        set background(value: string);
        /** Gets or sets the placeholder color */
        get placeholderColor(): string;
        set placeholderColor(value: string);
        /** Gets or sets the text displayed when the control is empty */
        get placeholderText(): string;
        set placeholderText(value: string);
        /** Gets or sets the dead key flag */
        get deadKey(): boolean;
        set deadKey(flag: boolean);
        /** Gets or sets the highlight text */
        get highlightedText(): string;
        set highlightedText(text: string);
        /** Gets or sets if the current key should be added */
        get addKey(): boolean;
        set addKey(flag: boolean);
        /** Gets or sets the value of the current key being entered */
        get currentKey(): string;
        set currentKey(key: string);
        /** Gets or sets the text displayed in the control */
        get text(): string;
        set text(value: string);
        private _textHasChanged;
        /** Gets or sets control width */
        get width(): string | number;
        set width(value: string | number);
        /**
         * Creates a new InputText
         * @param name defines the control name
         * @param text defines the text of the control
         */
        constructor(name?: string | undefined, text?: string);
        /** @hidden */
        onBlur(): void;
        /** @hidden */
        onFocus(): void;
        /**
         * Function to focus an inputText programmatically
         */
        focus(): void;
        /**
         * Function to unfocus an inputText programmatically
         */
        blur(): void;
        protected _getTypeName(): string;
        /**
         * Function called to get the list of controls that should not steal the focus from this control
         * @returns an array of controls
         */
        keepsFocusWith(): BABYLON.Nullable<Control[]>;
        /** @hidden */
        processKey(keyCode: number, key?: string, evt?: BABYLON.IKeyboardEvent): void;
        /** @hidden */
        private _updateValueFromCursorIndex;
        /** @hidden */
        private _processDblClick;
        /** @hidden */
        private _selectAllText;
        /**
         * Handles the keyboard event
         * @param evt Defines the KeyboardEvent
         */
        processKeyboard(evt: BABYLON.IKeyboardEvent): void;
        /** @hidden */
        private _onCopyText;
        /** @hidden */
        private _onCutText;
        /** @hidden */
        private _onPasteText;
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: BABYLON.Nullable<Measure>): void;
        _onPointerDown(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, pi: BABYLON.PointerInfoBase): boolean;
        _onPointerMove(target: Control, coordinates: BABYLON.Vector2, pointerId: number, pi: BABYLON.PointerInfoBase): void;
        _onPointerUp(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean): void;
        protected _beforeRenderText(textWrapper: TextWrapper): TextWrapper;
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a 2D grid container
     */
    export class Grid extends Container {
        name?: string | undefined;
        private _rowDefinitions;
        private _columnDefinitions;
        private _cells;
        private _childControls;
        /**
         * Gets the number of columns
         */
        get columnCount(): number;
        /**
         * Gets the number of rows
         */
        get rowCount(): number;
        /** Gets the list of children */
        get children(): Control[];
        /** Gets the list of cells (e.g. the containers) */
        get cells(): {
            [key: string]: Container;
        };
        /**
         * Gets the definition of a specific row
         * @param index defines the index of the row
         * @returns the row definition
         */
        getRowDefinition(index: number): BABYLON.Nullable<ValueAndUnit>;
        /**
         * Gets the definition of a specific column
         * @param index defines the index of the column
         * @returns the column definition
         */
        getColumnDefinition(index: number): BABYLON.Nullable<ValueAndUnit>;
        /**
         * Adds a new row to the grid
         * @param height defines the height of the row (either in pixel or a value between 0 and 1)
         * @param isPixel defines if the height is expressed in pixel (or in percentage)
         * @returns the current grid
         */
        addRowDefinition(height: number, isPixel?: boolean): Grid;
        /**
         * Adds a new column to the grid
         * @param width defines the width of the column (either in pixel or a value between 0 and 1)
         * @param isPixel defines if the width is expressed in pixel (or in percentage)
         * @returns the current grid
         */
        addColumnDefinition(width: number, isPixel?: boolean): Grid;
        /**
         * Update a row definition
         * @param index defines the index of the row to update
         * @param height defines the height of the row (either in pixel or a value between 0 and 1)
         * @param isPixel defines if the weight is expressed in pixel (or in percentage)
         * @returns the current grid
         */
        setRowDefinition(index: number, height: number, isPixel?: boolean): Grid;
        /**
         * Update a column definition
         * @param index defines the index of the column to update
         * @param width defines the width of the column (either in pixel or a value between 0 and 1)
         * @param isPixel defines if the width is expressed in pixel (or in percentage)
         * @returns the current grid
         */
        setColumnDefinition(index: number, width: number, isPixel?: boolean): Grid;
        /**
         * Gets the list of children stored in a specific cell
         * @param row defines the row to check
         * @param column defines the column to check
         * @returns the list of controls
         */
        getChildrenAt(row: number, column: number): BABYLON.Nullable<Array<Control>>;
        /**
         * Gets a string representing the child cell info (row x column)
         * @param child defines the control to get info from
         * @returns a string containing the child cell info (row x column)
         */
        getChildCellInfo(child: Control): string;
        private _removeCell;
        private _offsetCell;
        /**
         * Remove a column definition at specified index
         * @param index defines the index of the column to remove
         * @returns the current grid
         */
        removeColumnDefinition(index: number): Grid;
        /**
         * Remove a row definition at specified index
         * @param index defines the index of the row to remove
         * @returns the current grid
         */
        removeRowDefinition(index: number): Grid;
        /**
         * Adds a new control to the current grid
         * @param control defines the control to add
         * @param row defines the row where to add the control (0 by default)
         * @param column defines the column where to add the control (0 by default)
         * @returns the current grid
         */
        addControl(control: Control, row?: number, column?: number): Grid;
        /**
         * Removes a control from the current container
         * @param control defines the control to remove
         * @returns the current container
         */
        removeControl(control: Control): Container;
        /**
         * Creates a new Grid
         * @param name defines control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _getGridDefinitions(definitionCallback: (lefts: number[], tops: number[], widths: number[], heights: number[]) => void): void;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        _flagDescendantsAsMatrixDirty(): void;
        _renderHighlightSpecific(context: CanvasRenderingContext2D): void;
        /** Releases associated resources */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /** Class used to create color pickers */
    export class ColorPicker extends Control {
        name?: string | undefined;
        private static _Epsilon;
        private _colorWheelCanvas;
        private _value;
        private _tmpColor;
        private _pointerStartedOnSquare;
        private _pointerStartedOnWheel;
        private _squareLeft;
        private _squareTop;
        private _squareSize;
        private _h;
        private _s;
        private _v;
        private _lastPointerDownId;
        /**
         * BABYLON.Observable raised when the value changes
         */
        onValueChangedObservable: BABYLON.Observable<BABYLON.Color3>;
        /** Gets or sets the color of the color picker */
        get value(): BABYLON.Color3;
        set value(value: BABYLON.Color3);
        /**
         * Gets or sets control width
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get width(): string | number;
        set width(value: string | number);
        /**
         * Gets or sets control height
         * @see https://doc.babylonjs.com/how_to/gui#position-and-size
         */
        get height(): string | number;
        /** Gets or sets control height */
        set height(value: string | number);
        /** Gets or sets control size */
        get size(): string | number;
        set size(value: string | number);
        /**
         * Creates a new ColorPicker
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        /** @hidden */
        protected _preMeasure(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        private _updateSquareProps;
        private _drawGradientSquare;
        private _drawCircle;
        private _createColorWheelCanvas;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D): void;
        private _pointerIsDown;
        private _updateValueFromPointer;
        private _isPointOnSquare;
        private _isPointOnWheel;
        _onPointerDown(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, pi: BABYLON.PointerInfoBase): boolean;
        _onPointerMove(target: Control, coordinates: BABYLON.Vector2, pointerId: number, pi: BABYLON.PointerInfoBase): void;
        _onPointerUp(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi: BABYLON.PointerInfoBase): void;
        _onCanvasBlur(): void;
        /**
         * This function expands the color picker by creating a color picker dialog with manual
         * color value input and the ability to save colors into an array to be used later in
         * subsequent launches of the dialogue.
         * @param advancedTexture defines the AdvancedDynamicTexture the dialog is assigned to
         * @param options defines size for dialog and options for saved colors. Also accepts last color picked as hex string and saved colors array as hex strings.
         * @returns picked color as a hex string and the saved colors array as hex strings.
         */
        static ShowPickerDialogAsync(advancedTexture: AdvancedDynamicTexture, options: {
            pickerWidth?: string;
            pickerHeight?: string;
            headerHeight?: string;
            lastColor?: string;
            swatchLimit?: number;
            numSwatchesPerLine?: number;
            savedColors?: Array<string>;
        }): Promise<{
            savedColors?: string[];
            pickedColor: string;
        }>;
    }
}
declare module BABYLON.GUI {
    /** Class used to create 2D ellipse containers */
    export class Ellipse extends Container {
        name?: string | undefined;
        private _thickness;
        /** Gets or sets border thickness */
        get thickness(): number;
        set thickness(value: number);
        /**
         * Creates a new Ellipse
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _localDraw(context: CanvasRenderingContext2D): void;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        protected _clipForChildren(context: CanvasRenderingContext2D): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a focusable button that can easily handle keyboard events
     */
    export class FocusableButton extends Button implements IFocusableControl {
        name?: string | undefined;
        /** Highlight color when button is focused */
        focusedColor: BABYLON.Nullable<string>;
        private _isFocused;
        private _unfocusedColor;
        /** BABYLON.Observable raised when the control gets the focus */
        onFocusObservable: BABYLON.Observable<Button>;
        /** BABYLON.Observable raised when the control loses the focus */
        onBlurObservable: BABYLON.Observable<Button>;
        /** BABYLON.Observable raised when a key event was processed */
        onKeyboardEventProcessedObservable: BABYLON.Observable<BABYLON.IKeyboardEvent>;
        constructor(name?: string | undefined);
        /** @hidden */
        onBlur(): void;
        /** @hidden */
        onFocus(): void;
        /**
         * Function called to get the list of controls that should not steal the focus from this control
         * @returns an array of controls
         */
        keepsFocusWith(): BABYLON.Nullable<Control[]>;
        /**
         * Function to focus a button programmatically
         */
        focus(): void;
        /**
         * Function to unfocus a button programmatically
         */
        blur(): void;
        /**
         * Handles the keyboard event
         * @param evt Defines the KeyboardEvent
         */
        processKeyboard(evt: BABYLON.IKeyboardEvent): void;
        /** @hidden */
        _onPointerDown(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, pi: BABYLON.PointerInfoBase): boolean;
        /** @hidden */
        displose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a password control
     */
    export class InputPassword extends InputText {
        protected _beforeRenderText(textWrapper: TextWrapper): TextWrapper;
    }
}
declare module BABYLON.GUI {
    /** Class used to render 2D lines */
    export class Line extends Control {
        name?: string | undefined;
        private _lineWidth;
        private _x1;
        private _y1;
        private _x2;
        private _y2;
        private _dash;
        private _connectedControl;
        private _connectedControlDirtyObserver;
        /** Gets or sets the dash pattern */
        get dash(): Array<number>;
        set dash(value: Array<number>);
        /** Gets or sets the control connected with the line end */
        get connectedControl(): Control;
        set connectedControl(value: Control);
        /** Gets or sets start coordinates on X axis */
        get x1(): string | number;
        set x1(value: string | number);
        /** Gets or sets start coordinates on Y axis */
        get y1(): string | number;
        set y1(value: string | number);
        /** Gets or sets end coordinates on X axis */
        get x2(): string | number;
        set x2(value: string | number);
        /** Gets or sets end coordinates on Y axis */
        get y2(): string | number;
        set y2(value: string | number);
        /** Gets or sets line width */
        get lineWidth(): number;
        set lineWidth(value: number);
        /** Gets or sets horizontal alignment */
        set horizontalAlignment(value: number);
        /** Gets or sets vertical alignment */
        set verticalAlignment(value: number);
        private get _effectiveX2();
        private get _effectiveY2();
        /**
         * Creates a new Line
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        _draw(context: CanvasRenderingContext2D): void;
        _measure(): void;
        protected _computeAlignment(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /**
         * Move one end of the line given 3D cartesian coordinates.
         * @param position Targeted world position
         * @param scene BABYLON.Scene
         * @param end (opt) Set to true to assign x2 and y2 coordinates of the line. Default assign to x1 and y1.
         */
        moveToVector3(position: BABYLON.Vector3, scene: BABYLON.Scene, end?: boolean): void;
        /**
         * Move one end of the line to a position in screen absolute space.
         * @param projectedPosition Position in screen absolute space (X, Y)
         * @param end (opt) Set to true to assign x2 and y2 coordinates of the line. Default assign to x1 and y1.
         */
        _moveToProjectedPosition(projectedPosition: BABYLON.Vector3, end?: boolean): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to store a point for a MultiLine object.
     * The point can be pure 2D coordinates, a mesh or a control
     */
    export class MultiLinePoint {
        private _multiLine;
        private _x;
        private _y;
        private _control;
        private _mesh;
        private _controlObserver;
        private _meshObserver;
        /** @hidden */
        _point: BABYLON.Vector3;
        /**
         * Creates a new MultiLinePoint
         * @param multiLine defines the source MultiLine object
         */
        constructor(multiLine: MultiLine);
        /** Gets or sets x coordinate */
        get x(): string | number;
        set x(value: string | number);
        /** Gets or sets y coordinate */
        get y(): string | number;
        set y(value: string | number);
        /** Gets or sets the control associated with this point */
        get control(): BABYLON.Nullable<Control>;
        set control(value: BABYLON.Nullable<Control>);
        /** Gets or sets the mesh associated with this point */
        get mesh(): BABYLON.Nullable<BABYLON.AbstractMesh>;
        set mesh(value: BABYLON.Nullable<BABYLON.AbstractMesh>);
        /** Resets links */
        resetLinks(): void;
        /**
         * Gets a translation vector with Z component
         * @returns the translation vector
         */
        translate(): BABYLON.Vector3;
        private _translatePoint;
        /** Release associated resources */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create multi line control
     */
    export class MultiLine extends Control {
        name?: string | undefined;
        private _lineWidth;
        private _dash;
        private _points;
        private _minX;
        private _minY;
        private _maxX;
        private _maxY;
        /**
         * Creates a new MultiLine
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        /** Gets or sets dash pattern */
        get dash(): Array<number>;
        set dash(value: Array<number>);
        /**
         * Gets point stored at specified index
         * @param index defines the index to look for
         * @returns the requested point if found
         */
        getAt(index: number): MultiLinePoint;
        /** Function called when a point is updated */
        onPointUpdate: () => void;
        /**
         * Adds new points to the point collection
         * @param items defines the list of items (mesh, control or 2d coordiantes) to add
         * @returns the list of created MultiLinePoint
         */
        add(...items: (AbstractMesh | Control | {
            x: string | number;
            y: string | number;
        })[]): MultiLinePoint[];
        /**
         * Adds a new point to the point collection
         * @param item defines the item (mesh, control or 2d coordiantes) to add
         * @returns the created MultiLinePoint
         */
        push(item?: (AbstractMesh | Control | {
            x: string | number;
            y: string | number;
        })): MultiLinePoint;
        /**
         * Remove a specific value or point from the active point collection
         * @param value defines the value or point to remove
         */
        remove(value: number | MultiLinePoint): void;
        /**
         * Resets this object to initial state (no point)
         */
        reset(): void;
        /**
         * Resets all links
         */
        resetLinks(): void;
        /** Gets or sets line width */
        get lineWidth(): number;
        set lineWidth(value: number);
        set horizontalAlignment(value: number);
        set verticalAlignment(value: number);
        protected _getTypeName(): string;
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: BABYLON.Nullable<Measure>): void;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        _measure(): void;
        protected _computeAlignment(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create radio button controls
     */
    export class RadioButton extends Control {
        name?: string | undefined;
        private _isChecked;
        private _background;
        private _checkSizeRatio;
        private _thickness;
        /** Gets or sets border thickness */
        get thickness(): number;
        set thickness(value: number);
        /** Gets or sets group name */
        group: string;
        /** BABYLON.Observable raised when isChecked is changed */
        onIsCheckedChangedObservable: BABYLON.Observable<boolean>;
        /** Gets or sets a value indicating the ratio between overall size and check size */
        get checkSizeRatio(): number;
        set checkSizeRatio(value: number);
        /** Gets or sets background color */
        get background(): string;
        set background(value: string);
        /** Gets or sets a boolean indicating if the checkbox is checked or not */
        get isChecked(): boolean;
        set isChecked(value: boolean);
        /**
         * Creates a new RadioButton
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        _draw(context: CanvasRenderingContext2D): void;
        _onPointerDown(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, pi: BABYLON.PointerInfoBase): boolean;
        /**
         * Utility function to easily create a radio button with a header
         * @param title defines the label to use for the header
         * @param group defines the group to use for the radio button
         * @param isChecked defines the initial state of the radio button
         * @param onValueChanged defines the callback to call when value changes
         * @returns a StackPanel containing the radio button and a textBlock
         */
        static AddRadioButtonWithHeader(title: string, group: string, isChecked: boolean, onValueChanged: (button: RadioButton, value: boolean) => void): StackPanel;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create slider controls
     */
    export class BaseSlider extends Control {
        name?: string | undefined;
        protected _thumbWidth: ValueAndUnit;
        private _minimum;
        private _maximum;
        private _value;
        private _isVertical;
        protected _barOffset: ValueAndUnit;
        private _isThumbClamped;
        protected _displayThumb: boolean;
        private _step;
        private _lastPointerDownId;
        protected _effectiveBarOffset: number;
        protected _renderLeft: number;
        protected _renderTop: number;
        protected _renderWidth: number;
        protected _renderHeight: number;
        protected _backgroundBoxLength: number;
        protected _backgroundBoxThickness: number;
        protected _effectiveThumbThickness: number;
        /** BABYLON.Observable raised when the sldier value changes */
        onValueChangedObservable: BABYLON.Observable<number>;
        /** Gets or sets a boolean indicating if the thumb must be rendered */
        get displayThumb(): boolean;
        set displayThumb(value: boolean);
        /** Gets or sets a step to apply to values (0 by default) */
        get step(): number;
        set step(value: number);
        /** Gets or sets main bar offset (ie. the margin applied to the value bar) */
        get barOffset(): string | number;
        /** Gets main bar offset in pixels*/
        get barOffsetInPixels(): number;
        set barOffset(value: string | number);
        /** Gets or sets thumb width */
        get thumbWidth(): string | number;
        /** Gets thumb width in pixels */
        get thumbWidthInPixels(): number;
        set thumbWidth(value: string | number);
        /** Gets or sets minimum value */
        get minimum(): number;
        set minimum(value: number);
        /** Gets or sets maximum value */
        get maximum(): number;
        set maximum(value: number);
        /** Gets or sets current value */
        get value(): number;
        set value(value: number);
        /**Gets or sets a boolean indicating if the slider should be vertical or horizontal */
        get isVertical(): boolean;
        set isVertical(value: boolean);
        /** Gets or sets a value indicating if the thumb can go over main bar extends */
        get isThumbClamped(): boolean;
        set isThumbClamped(value: boolean);
        /**
         * Creates a new BaseSlider
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _getThumbPosition(): number;
        protected _getThumbThickness(type: string): number;
        protected _prepareRenderingData(type: string): void;
        private _pointerIsDown;
        /** @hidden */
        protected _updateValueFromPointer(x: number, y: number): void;
        _onPointerDown(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, pi: BABYLON.PointerInfoBase): boolean;
        _onPointerMove(target: Control, coordinates: BABYLON.Vector2, pointerId: number, pi: BABYLON.PointerInfoBase): void;
        _onPointerUp(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean): void;
        _onCanvasBlur(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create slider controls
     */
    export class Slider extends BaseSlider {
        name?: string | undefined;
        private _background;
        private _borderColor;
        private _thumbColor;
        private _isThumbCircle;
        protected _displayValueBar: boolean;
        /** Gets or sets a boolean indicating if the value bar must be rendered */
        get displayValueBar(): boolean;
        set displayValueBar(value: boolean);
        /** Gets or sets border color */
        get borderColor(): string;
        set borderColor(value: string);
        /** Gets or sets background color */
        get background(): string;
        set background(value: string);
        /** Gets or sets thumb's color */
        get thumbColor(): string;
        set thumbColor(value: string);
        /** Gets or sets a boolean indicating if the thumb should be round or square */
        get isThumbCircle(): boolean;
        set isThumbCircle(value: boolean);
        /**
         * Creates a new Slider
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: BABYLON.Nullable<Measure>): void;
    }
}
declare module BABYLON.GUI {
    /** Class used to create a RadioGroup
     * which contains groups of radio buttons
    */
    export class SelectorGroup {
        /** name of SelectorGroup */
        name: string;
        private _groupPanel;
        private _selectors;
        private _groupHeader;
        /**
         * Creates a new SelectorGroup
         * @param name of group, used as a group heading
         */
        constructor(
        /** name of SelectorGroup */
        name: string);
        /** Gets the groupPanel of the SelectorGroup  */
        get groupPanel(): StackPanel;
        /** Gets the selectors array */
        get selectors(): StackPanel[];
        /** Gets and sets the group header */
        get header(): string;
        set header(label: string);
        /** @hidden */
        private _addGroupHeader;
        /** @hidden*/
        _getSelector(selectorNb: number): StackPanel | undefined;
        /** Removes the selector at the given position
        * @param selectorNb the position of the selector within the group
       */
        removeSelector(selectorNb: number): void;
    }
    /** Class used to create a CheckboxGroup
     * which contains groups of checkbox buttons
    */
    export class CheckboxGroup extends SelectorGroup {
        /** Adds a checkbox as a control
         * @param text is the label for the selector
         * @param func is the function called when the Selector is checked
         * @param checked is true when Selector is checked
         */
        addCheckbox(text: string, func?: (s: boolean) => void, checked?: boolean): void;
        /** @hidden */
        _setSelectorLabel(selectorNb: number, label: string): void;
        /** @hidden */
        _setSelectorLabelColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonBackground(selectorNb: number, color: string): void;
    }
    /** Class used to create a RadioGroup
     * which contains groups of radio buttons
    */
    export class RadioGroup extends SelectorGroup {
        private _selectNb;
        /** Adds a radio button as a control
         * @param label is the label for the selector
         * @param func is the function called when the Selector is checked
         * @param checked is true when Selector is checked
         */
        addRadio(label: string, func?: (n: number) => void, checked?: boolean): void;
        /** @hidden */
        _setSelectorLabel(selectorNb: number, label: string): void;
        /** @hidden */
        _setSelectorLabelColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonBackground(selectorNb: number, color: string): void;
    }
    /** Class used to create a SliderGroup
     * which contains groups of slider buttons
    */
    export class SliderGroup extends SelectorGroup {
        /**
         * Adds a slider to the SelectorGroup
         * @param label is the label for the SliderBar
         * @param func is the function called when the Slider moves
         * @param unit is a string describing the units used, eg degrees or metres
         * @param min is the minimum value for the Slider
         * @param max is the maximum value for the Slider
         * @param value is the start value for the Slider between min and max
         * @param onValueChange is the function used to format the value displayed, eg radians to degrees
         */
        addSlider(label: string, func?: (v: number) => void, unit?: string, min?: number, max?: number, value?: number, onValueChange?: (v: number) => number): void;
        /** @hidden */
        _setSelectorLabel(selectorNb: number, label: string): void;
        /** @hidden */
        _setSelectorLabelColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonColor(selectorNb: number, color: string): void;
        /** @hidden */
        _setSelectorButtonBackground(selectorNb: number, color: string): void;
    }
    /** Class used to hold the controls for the checkboxes, radio buttons and sliders
     * @see https://doc.babylonjs.com/how_to/selector
    */
    export class SelectionPanel extends Rectangle {
        /** name of SelectionPanel */
        name: string;
        /** an array of SelectionGroups */
        groups: SelectorGroup[];
        private _panel;
        private _buttonColor;
        private _buttonBackground;
        private _headerColor;
        private _barColor;
        private _barHeight;
        private _spacerHeight;
        private _labelColor;
        private _groups;
        private _bars;
        /**
        * Creates a new SelectionPanel
        * @param name of SelectionPanel
        * @param groups is an array of SelectionGroups
        */
        constructor(
        /** name of SelectionPanel */
        name: string, 
        /** an array of SelectionGroups */
        groups?: SelectorGroup[]);
        protected _getTypeName(): string;
        /** Gets the (stack) panel of the SelectionPanel  */
        get panel(): StackPanel;
        /** Gets or sets the headerColor */
        get headerColor(): string;
        set headerColor(color: string);
        private _setHeaderColor;
        /** Gets or sets the button color */
        get buttonColor(): string;
        set buttonColor(color: string);
        private _setbuttonColor;
        /** Gets or sets the label color */
        get labelColor(): string;
        set labelColor(color: string);
        private _setLabelColor;
        /** Gets or sets the button background */
        get buttonBackground(): string;
        set buttonBackground(color: string);
        private _setButtonBackground;
        /** Gets or sets the color of separator bar */
        get barColor(): string;
        set barColor(color: string);
        private _setBarColor;
        /** Gets or sets the height of separator bar */
        get barHeight(): string;
        set barHeight(value: string);
        private _setBarHeight;
        /** Gets or sets the height of spacers*/
        get spacerHeight(): string;
        set spacerHeight(value: string);
        private _setSpacerHeight;
        /** Adds a bar between groups */
        private _addSpacer;
        /** Add a group to the selection panel
         * @param group is the selector group to add
         */
        addGroup(group: SelectorGroup): void;
        /** Remove the group from the given position
         * @param groupNb is the position of the group in the list
         */
        removeGroup(groupNb: number): void;
        /** Change a group header label
         * @param label is the new group header label
         * @param groupNb is the number of the group to relabel
         * */
        setHeaderName(label: string, groupNb: number): void;
        /** Change selector label to the one given
         * @param label is the new selector label
         * @param groupNb is the number of the groupcontaining the selector
         * @param selectorNb is the number of the selector within a group to relabel
         * */
        relabel(label: string, groupNb: number, selectorNb: number): void;
        /** For a given group position remove the selector at the given position
         * @param groupNb is the number of the group to remove the selector from
         * @param selectorNb is the number of the selector within the group
         */
        removeFromGroupSelector(groupNb: number, selectorNb: number): void;
        /** For a given group position of correct type add a checkbox button
         * @param groupNb is the number of the group to remove the selector from
         * @param label is the label for the selector
         * @param func is the function called when the Selector is checked
         * @param checked is true when Selector is checked
         */
        addToGroupCheckbox(groupNb: number, label: string, func?: () => void, checked?: boolean): void;
        /** For a given group position of correct type add a radio button
         * @param groupNb is the number of the group to remove the selector from
         * @param label is the label for the selector
         * @param func is the function called when the Selector is checked
         * @param checked is true when Selector is checked
         */
        addToGroupRadio(groupNb: number, label: string, func?: () => void, checked?: boolean): void;
        /**
         * For a given slider group add a slider
         * @param groupNb is the number of the group to add the slider to
         * @param label is the label for the Slider
         * @param func is the function called when the Slider moves
         * @param unit is a string describing the units used, eg degrees or metres
         * @param min is the minimum value for the Slider
         * @param max is the maximum value for the Slider
         * @param value is the start value for the Slider between min and max
         * @param onVal is the function used to format the value displayed, eg radians to degrees
         */
        addToGroupSlider(groupNb: number, label: string, func?: () => void, unit?: string, min?: number, max?: number, value?: number, onVal?: (v: number) => number): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to hold a the container for ScrollViewer
     * @hidden
    */
    export class _ScrollViewerWindow extends Container {
        parentClientWidth: number;
        parentClientHeight: number;
        private _freezeControls;
        private _parentMeasure;
        private _oldLeft;
        private _oldTop;
        get freezeControls(): boolean;
        set freezeControls(value: boolean);
        private _bucketWidth;
        private _bucketHeight;
        private _buckets;
        private _bucketLen;
        get bucketWidth(): number;
        get bucketHeight(): number;
        setBucketSizes(width: number, height: number): void;
        private _useBuckets;
        private _makeBuckets;
        private _dispatchInBuckets;
        private _updateMeasures;
        private _updateChildrenMeasures;
        private _restoreMeasures;
        /**
        * Creates a new ScrollViewerWindow
        * @param name of ScrollViewerWindow
        */
        constructor(name?: string);
        protected _getTypeName(): string;
        /** @hidden */
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        /** @hidden */
        _layout(parentMeasure: Measure, context: CanvasRenderingContext2D): boolean;
        private _scrollChildren;
        private _scrollChildrenWithBuckets;
        /** @hidden */
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Measure): void;
        protected _postMeasure(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create slider controls
     */
    export class ScrollBar extends BaseSlider {
        name?: string | undefined;
        private _background;
        private _borderColor;
        private _tempMeasure;
        /** Gets or sets border color */
        get borderColor(): string;
        set borderColor(value: string);
        /** Gets or sets background color */
        get background(): string;
        set background(value: string);
        /**
         * Creates a new Slider
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _getThumbThickness(): number;
        _draw(context: CanvasRenderingContext2D): void;
        private _first;
        private _originX;
        private _originY;
        /** @hidden */
        protected _updateValueFromPointer(x: number, y: number): void;
        _onPointerDown(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, pi: BABYLON.PointerInfoBase): boolean;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create slider controls
     */
    export class ImageScrollBar extends BaseSlider {
        name?: string | undefined;
        private _backgroundBaseImage;
        private _backgroundImage;
        private _thumbImage;
        private _thumbBaseImage;
        private _thumbLength;
        private _thumbHeight;
        private _barImageHeight;
        private _tempMeasure;
        /** Number of 90° rotation to apply on the images when in vertical mode */
        num90RotationInVerticalMode: number;
        /**
         * Gets or sets the image used to render the background for horizontal bar
         */
        get backgroundImage(): Image;
        set backgroundImage(value: Image);
        /**
         * Gets or sets the image used to render the thumb
         */
        get thumbImage(): Image;
        set thumbImage(value: Image);
        /**
         * Gets or sets the length of the thumb
         */
        get thumbLength(): number;
        set thumbLength(value: number);
        /**
         * Gets or sets the height of the thumb
         */
        get thumbHeight(): number;
        set thumbHeight(value: number);
        /**
         * Gets or sets the height of the bar image
         */
        get barImageHeight(): number;
        set barImageHeight(value: number);
        /**
         * Creates a new ImageScrollBar
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        protected _getThumbThickness(): number;
        _draw(context: CanvasRenderingContext2D): void;
        private _first;
        private _originX;
        private _originY;
        /** @hidden */
        protected _updateValueFromPointer(x: number, y: number): void;
        _onPointerDown(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, pi: BABYLON.PointerInfoBase): boolean;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to hold a viewer window and sliders in a grid
    */
    export class ScrollViewer extends Rectangle {
        private _grid;
        private _horizontalBarSpace;
        private _verticalBarSpace;
        private _dragSpace;
        private _horizontalBar;
        private _verticalBar;
        private _barColor;
        private _barBackground;
        private _barImage;
        private _horizontalBarImage;
        private _verticalBarImage;
        private _barBackgroundImage;
        private _horizontalBarBackgroundImage;
        private _verticalBarBackgroundImage;
        private _barSize;
        private _window;
        private _pointerIsOver;
        private _wheelPrecision;
        private _onWheelObserver;
        private _clientWidth;
        private _clientHeight;
        private _useImageBar;
        private _thumbLength;
        private _thumbHeight;
        private _barImageHeight;
        private _horizontalBarImageHeight;
        private _verticalBarImageHeight;
        private _oldWindowContentsWidth;
        private _oldWindowContentsHeight;
        /**
         * Gets the horizontal scrollbar
         */
        get horizontalBar(): ScrollBar | ImageScrollBar;
        /**
         * Gets the vertical scrollbar
         */
        get verticalBar(): ScrollBar | ImageScrollBar;
        /**
         * Adds a new control to the current container
         * @param control defines the control to add
         * @returns the current container
         */
        addControl(control: BABYLON.Nullable<Control>): Container;
        /**
         * Removes a control from the current container
         * @param control defines the control to remove
         * @returns the current container
         */
        removeControl(control: Control): Container;
        /** Gets the list of children */
        get children(): Control[];
        _flagDescendantsAsMatrixDirty(): void;
        /**
         * Freezes or unfreezes the controls in the window.
         * When controls are frozen, the scroll viewer can render a lot more quickly but updates to positions/sizes of controls
         * are not taken into account. If you want to change positions/sizes, unfreeze, perform the changes then freeze again
         */
        get freezeControls(): boolean;
        set freezeControls(value: boolean);
        /** Gets the bucket width */
        get bucketWidth(): number;
        /** Gets the bucket height */
        get bucketHeight(): number;
        /**
         * Sets the bucket sizes.
         * When freezeControls is true, setting a non-zero bucket size will improve performances by updating only
         * controls that are visible. The bucket sizes is used to subdivide (internally) the window area to smaller areas into which
         * controls are dispatched. So, the size should be roughly equals to the mean size of all the controls of
         * the window. To disable the usage of buckets, sets either width or height (or both) to 0.
         * Please note that using this option will raise the memory usage (the higher the bucket sizes, the less memory
         * used), that's why it is not enabled by default.
         * @param width width of the bucket
         * @param height height of the bucket
         */
        setBucketSizes(width: number, height: number): void;
        private _forceHorizontalBar;
        private _forceVerticalBar;
        /**
         * Forces the horizontal scroll bar to be displayed
         */
        get forceHorizontalBar(): boolean;
        set forceHorizontalBar(value: boolean);
        /**
         * Forces the vertical scroll bar to be displayed
         */
        get forceVerticalBar(): boolean;
        set forceVerticalBar(value: boolean);
        /**
        * Creates a new ScrollViewer
        * @param name of ScrollViewer
        */
        constructor(name?: string, isImageBased?: boolean);
        /** Reset the scroll viewer window to initial size */
        resetWindow(): void;
        protected _getTypeName(): string;
        private _buildClientSizes;
        protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;
        protected _postMeasure(): void;
        /**
         * Gets or sets the mouse wheel precision
         * from 0 to 1 with a default value of 0.05
         * */
        get wheelPrecision(): number;
        set wheelPrecision(value: number);
        /** Gets or sets the scroll bar container background color */
        get scrollBackground(): string;
        set scrollBackground(color: string);
        /** Gets or sets the bar color */
        get barColor(): string;
        set barColor(color: string);
        /** Gets or sets the bar image */
        get thumbImage(): Image;
        set thumbImage(value: Image);
        /** Gets or sets the horizontal bar image */
        get horizontalThumbImage(): Image;
        set horizontalThumbImage(value: Image);
        /** Gets or sets the vertical bar image */
        get verticalThumbImage(): Image;
        set verticalThumbImage(value: Image);
        /** Gets or sets the size of the bar */
        get barSize(): number;
        set barSize(value: number);
        /** Gets or sets the length of the thumb */
        get thumbLength(): number;
        set thumbLength(value: number);
        /** Gets or sets the height of the thumb */
        get thumbHeight(): number;
        set thumbHeight(value: number);
        /** Gets or sets the height of the bar image */
        get barImageHeight(): number;
        set barImageHeight(value: number);
        /** Gets or sets the height of the horizontal bar image */
        get horizontalBarImageHeight(): number;
        set horizontalBarImageHeight(value: number);
        /** Gets or sets the height of the vertical bar image */
        get verticalBarImageHeight(): number;
        set verticalBarImageHeight(value: number);
        /** Gets or sets the bar background */
        get barBackground(): string;
        set barBackground(color: string);
        /** Gets or sets the bar background image */
        get barImage(): Image;
        set barImage(value: Image);
        /** Gets or sets the horizontal bar background image */
        get horizontalBarImage(): Image;
        set horizontalBarImage(value: Image);
        /** Gets or sets the vertical bar background image */
        get verticalBarImage(): Image;
        set verticalBarImage(value: Image);
        private _setWindowPosition;
        /** @hidden */
        private _updateScroller;
        _link(host: AdvancedDynamicTexture): void;
        /** @hidden */
        private _addBar;
        /** @hidden */
        private _attachWheel;
        _renderHighlightSpecific(context: CanvasRenderingContext2D): void;
        /** Releases associated resources */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create toggle buttons
     */
    export class ToggleButton extends Rectangle {
        name?: string | undefined;
        /**
         * Function called to generate the toActive animation
         */
        toActiveAnimation: () => void;
        /**
         * Function called to generate the toInactive animation
         */
        toInactiveAnimation: () => void;
        /**
         * Function called to generate a pointer enter animation when the toggle button is active.
         */
        pointerEnterActiveAnimation: () => void;
        /**
         * Function called to generate a pointer out animation when the toggle button is active.
         */
        pointerOutActiveAnimation: () => void;
        /**
         * Function called to generate a pointer down animation when the toggle button is active.
         */
        pointerDownActiveAnimation: () => void;
        /**
         * Function called to generate a pointer up animation when the toggle button is active.
         */
        pointerUpActiveAnimation: () => void;
        /**
         * Function called to generate a pointer enter animation when the toggle button is inactive.
         */
        pointerEnterInactiveAnimation: () => void;
        /**
         * Function called to generate a pointer out animation when the toggle button is inactive.
         */
        pointerOutInactiveAnimation: () => void;
        /**
         * Function called to generate a pointer down animation when the toggle button is inactive.
         */
        pointerDownInactiveAnimation: () => void;
        /**
         * Function called to generate a pointer up animation when the toggle button is inactive.
         */
        pointerUpInactiveAnimation: () => void;
        /** BABYLON.Observable raised when isActive is changed */
        onIsActiveChangedObservable: BABYLON.Observable<boolean>;
        /**
         * Gets or sets a boolean indicating that the toggle button will let internal controls handle picking instead of doing it directly using its bounding info
         */
        delegatePickingToChildren: boolean;
        private _image;
        /**
         * Returns the ToggleButton's image control if it exists
         */
        get image(): BABYLON.Nullable<Image>;
        private _textBlock;
        /**
         * Returns the ToggleButton's child TextBlock control if it exists
         */
        get textBlock(): BABYLON.Nullable<TextBlock>;
        private _group;
        /** Gets or sets group name this toggle button belongs to */
        get group(): string;
        set group(value: string);
        private _isActive;
        /** Gets or sets a boolean indicating if the toogle button is active or not */
        get isActive(): boolean;
        set isActive(value: boolean);
        /**
         * Creates a new ToggleButton
         * @param name defines the control name
         * @param group defines the toggle group this toggle belongs to
         */
        constructor(name?: string | undefined, group?: string);
        protected _getTypeName(): string;
        /** @hidden */
        _processPicking(x: number, y: number, pi: BABYLON.PointerInfoBase, type: number, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
        /** @hidden */
        _onPointerEnter(target: Control, pi: BABYLON.PointerInfoBase): boolean;
        /** @hidden */
        _onPointerOut(target: Control, pi: BABYLON.PointerInfoBase, force?: boolean): void;
        /** @hidden */
        _onPointerDown(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, pi: BABYLON.PointerInfoBase): boolean;
        /** @hidden */
        _onPointerUp(target: Control, coordinates: BABYLON.Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi: BABYLON.PointerInfoBase): void;
    }
}
declare module BABYLON.GUI {
    /** Class used to render a grid  */
    export class DisplayGrid extends Control {
        name?: string | undefined;
        private _cellWidth;
        private _cellHeight;
        private _minorLineTickness;
        private _minorLineColor;
        private _majorLineTickness;
        private _majorLineColor;
        private _majorLineFrequency;
        private _background;
        private _displayMajorLines;
        private _displayMinorLines;
        /** Gets or sets a boolean indicating if minor lines must be rendered (true by default)) */
        get displayMinorLines(): boolean;
        set displayMinorLines(value: boolean);
        /** Gets or sets a boolean indicating if major lines must be rendered (true by default)) */
        get displayMajorLines(): boolean;
        set displayMajorLines(value: boolean);
        /** Gets or sets background color (Black by default) */
        get background(): string;
        set background(value: string);
        /** Gets or sets the width of each cell (20 by default) */
        get cellWidth(): number;
        set cellWidth(value: number);
        /** Gets or sets the height of each cell (20 by default) */
        get cellHeight(): number;
        set cellHeight(value: number);
        /** Gets or sets the tickness of minor lines (1 by default) */
        get minorLineTickness(): number;
        set minorLineTickness(value: number);
        /** Gets or sets the color of minor lines (DarkGray by default) */
        get minorLineColor(): string;
        set minorLineColor(value: string);
        /** Gets or sets the tickness of major lines (2 by default) */
        get majorLineTickness(): number;
        set majorLineTickness(value: number);
        /** Gets or sets the color of major lines (White by default) */
        get majorLineColor(): string;
        set majorLineColor(value: string);
        /** Gets or sets the frequency of major lines (default is 1 every 5 minor lines)*/
        get majorLineFrequency(): number;
        set majorLineFrequency(value: number);
        /**
         * Creates a new GridDisplayRectangle
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: BABYLON.Nullable<Measure>): void;
        protected _getTypeName(): string;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create slider controls based on images
     */
    export class ImageBasedSlider extends BaseSlider {
        name?: string | undefined;
        private _backgroundImage;
        private _thumbImage;
        private _valueBarImage;
        private _tempMeasure;
        get displayThumb(): boolean;
        set displayThumb(value: boolean);
        /**
         * Gets or sets the image used to render the background
         */
        get backgroundImage(): Image;
        set backgroundImage(value: Image);
        /**
         * Gets or sets the image used to render the value bar
         */
        get valueBarImage(): Image;
        set valueBarImage(value: Image);
        /**
         * Gets or sets the image used to render the thumb
         */
        get thumbImage(): Image;
        set thumbImage(value: Image);
        /**
         * Creates a new ImageBasedSlider
         * @param name defines the control name
         */
        constructor(name?: string | undefined);
        protected _getTypeName(): string;
        _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: BABYLON.Nullable<Measure>): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Forcing an export so that this code will execute
     * @hidden
     */
    const name = "Statics";
}
declare module BABYLON.GUI {
    /**
     * This class can be used to get instrumentation data from a AdvancedDynamicTexture object
     */
    export class AdvancedDynamicTextureInstrumentation implements BABYLON.IDisposable {
        /**
         * Define the instrumented AdvancedDynamicTexture.
         */
        texture: AdvancedDynamicTexture;
        private _captureRenderTime;
        private _renderTime;
        private _captureLayoutTime;
        private _layoutTime;
        private _onBeginRenderObserver;
        private _onEndRenderObserver;
        private _onBeginLayoutObserver;
        private _onEndLayoutObserver;
        /**
         * Gets the perf counter used to capture render time
         */
        get renderTimeCounter(): BABYLON.PerfCounter;
        /**
         * Gets the perf counter used to capture layout time
         */
        get layoutTimeCounter(): BABYLON.PerfCounter;
        /**
         * Enable or disable the render time capture
         */
        get captureRenderTime(): boolean;
        set captureRenderTime(value: boolean);
        /**
         * Enable or disable the layout time capture
         */
        get captureLayoutTime(): boolean;
        set captureLayoutTime(value: boolean);
        /**
         * Instantiates a new advanced dynamic texture instrumentation.
         * This class can be used to get instrumentation data from an AdvancedDynamicTexture object
         * @param texture Defines the AdvancedDynamicTexture to instrument
         */
        constructor(
        /**
         * Define the instrumented AdvancedDynamicTexture.
         */
        texture: AdvancedDynamicTexture);
        /**
         * Dispose and release associated resources.
         */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
    * Class used to load GUI via XML.
    */
    export class XmlLoader {
        private _nodes;
        private _nodeTypes;
        private _isLoaded;
        private _objectAttributes;
        private _parentClass;
        /**
        * Create a new xml loader
        * @param parentClass Sets the class context. Used when the loader is instanced inside a class and not in a global context
        */
        constructor(parentClass?: null);
        private _getChainElement;
        private _getClassAttribute;
        private _createGuiElement;
        private _parseGrid;
        private _parseElement;
        private _prepareSourceElement;
        private _parseElementsFromSource;
        private _parseXml;
        /**
         * Gets if the loading has finished.
         * @returns whether the loading has finished or not
        */
        isLoaded(): boolean;
        /**
         * Gets a loaded node / control by id.
         * @param id the Controls id set in the xml
         * @returns element of type Control
        */
        getNodeById(id: string): any;
        /**
         * Gets all loaded nodes / controls
         * @returns Array of controls
        */
        getNodes(): any;
        /**
         * Initiates the xml layout loading
         * @param xmlFile defines the xml layout to load
         * @param rootNode defines the node / control to use as a parent for the loaded layout controls.
         * @param callback defines the callback called on layout load.
         */
        loadLayout(xmlFile: any, rootNode: any, callback: any): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create containers for controls
     */
    export class Container3D extends Control3D {
        private _blockLayout;
        /**
         * Gets the list of child controls
         */
        protected _children: Control3D[];
        /**
         * Gets the list of child controls
         */
        get children(): Array<Control3D>;
        /**
         * Gets or sets a boolean indicating if the layout must be blocked (default is false).
         * This is helpful to optimize layout operation when adding multiple children in a row
         */
        get blockLayout(): boolean;
        set blockLayout(value: boolean);
        /**
         * Creates a new container
         * @param name defines the container name
         */
        constructor(name?: string);
        /**
         * Force the container to update the layout. Please note that it will not take blockLayout property in account
         * @returns the current container
         */
        updateLayout(): Container3D;
        /**
         * Gets a boolean indicating if the given control is in the children of this control
         * @param control defines the control to check
         * @returns true if the control is in the child list
         */
        containsControl(control: Control3D): boolean;
        /**
         * Adds a control to the children of this control
         * @param control defines the control to add
         * @returns the current container
         */
        addControl(control: Control3D): Container3D;
        /**
         * This function will be called everytime a new control is added
         */
        protected _arrangeChildren(): void;
        protected _createNode(scene: BABYLON.Scene): BABYLON.Nullable<BABYLON.TransformNode>;
        /**
         * Removes a control from the children of this control
         * @param control defines the control to remove
         * @returns the current container
         */
        removeControl(control: Control3D): Container3D;
        protected _getTypeName(): string;
        /**
         * Releases all associated resources
         */
        dispose(): void;
        /** Control rotation will remain unchanged  */
        static readonly UNSET_ORIENTATION: number;
        /** Control will rotate to make it look at sphere central axis */
        static readonly FACEORIGIN_ORIENTATION: number;
        /** Control will rotate to make it look back at sphere central axis */
        static readonly FACEORIGINREVERSED_ORIENTATION: number;
        /** Control will rotate to look at z axis (0, 0, 1) */
        static readonly FACEFORWARD_ORIENTATION: number;
        /** Control will rotate to look at negative z axis (0, 0, -1) */
        static readonly FACEFORWARDREVERSED_ORIENTATION: number;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a button in 3D
     */
    export class Button3D extends AbstractButton3D {
        /** @hidden */
        protected _currentMaterial: BABYLON.Material;
        /**
         * Creates a new button
         * @param name defines the control name
         */
        constructor(name?: string);
        /**
         * Apply the facade texture (created from the content property).
         * @param facadeTexture defines the AdvancedDynamicTexture to use
         */
        protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
        protected _getTypeName(): string;
        protected _createNode(scene: BABYLON.Scene): BABYLON.TransformNode;
        protected _affectMaterial(mesh: BABYLON.AbstractMesh): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Enum for Button States
     */
    /** @hidden */
    export enum ButtonState {
        /** None */
        None = 0,
        /** Pointer Entered */
        Hover = 1,
        /** Pointer Down */
        Press = 2
    }
    /**
     * Class used to create a touchable button in 3D
     */
    export class TouchButton3D extends Button3D {
        private _collisionMesh;
        private _collidableFrontDirection;
        private _lastTouchPoint;
        private _tempButtonForwardRay;
        private _lastKnownCollidableScale;
        private _collidableInitialized;
        private _frontOffset;
        private _backOffset;
        private _hoverOffset;
        private _pushThroughBackOffset;
        private _activeInteractions;
        private _previousHeight;
        /**
         * Creates a new touchable button
         * @param name defines the control name
         * @param collisionMesh mesh to track collisions with
         */
        constructor(name?: string, collisionMesh?: BABYLON.Mesh);
        /**
         * Sets the front-facing direction of the button
         * @param frontDir the forward direction of the button
         */
        set collidableFrontDirection(frontWorldDir: BABYLON.Vector3);
        private _getWorldMatrixData;
        /**
         * Sets the mesh used for testing input collision
         * @param collisionMesh the new collision mesh for the button
         */
        set collisionMesh(collisionMesh: BABYLON.Mesh);
        private _getShortestDistancePointToLine;
        private _isPrimedForInteraction;
        private _getPointOnButton;
        private _updateDistanceOffsets;
        private _getHeightFromButtonCenter;
        private _getDistanceOffPlane;
        private _updateButtonState;
        private _firePointerEvents;
        /** @hidden */
        _collisionCheckForStateChange(meshPos: BABYLON.Vector3, uniqueId: number, forceExit?: boolean): void;
        protected _getTypeName(): string;
        protected _createNode(scene: BABYLON.Scene): BABYLON.TransformNode;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to manage 3D user interface
     * @see https://doc.babylonjs.com/how_to/gui3d
     */
    export class GUI3DManager implements BABYLON.IDisposable {
        private _scene;
        private _sceneDisposeObserver;
        private _utilityLayer;
        private _rootContainer;
        private _pointerObserver;
        private _pointerOutObserver;
        private _touchableButtons;
        private _touchIds;
        private static _touchIdCounter;
        /** @hidden */
        _lastPickedControl: Control3D;
        /** @hidden */
        _lastControlOver: {
            [pointerId: number]: Control3D;
        };
        /** @hidden */
        _lastControlDown: {
            [pointerId: number]: Control3D;
        };
        /**
         * BABYLON.Observable raised when the point picked by the pointer events changed
         */
        onPickedPointChangedObservable: BABYLON.Observable<BABYLON.Nullable<BABYLON.Vector3>>;
        /** @hidden */
        _sharedMaterials: {
            [key: string]: BABYLON.Material;
        };
        /** @hidden */
        _touchSharedMaterials: {
            [key: string]: BABYLON.Material;
        };
        /** Gets the hosting scene */
        get scene(): BABYLON.Scene;
        /** Gets associated utility layer */
        get utilityLayer(): BABYLON.Nullable<BABYLON.UtilityLayerRenderer>;
        /**
         * Creates a new GUI3DManager
         * @param scene
         */
        constructor(scene?: BABYLON.Scene);
        private _handlePointerOut;
        private _doPicking;
        private _processTouchControls;
        /**
         * Gets the root container
         */
        get rootContainer(): Container3D;
        /**
         * Gets a boolean indicating if the given control is in the root child list
         * @param control defines the control to check
         * @returns true if the control is in the root child list
         */
        containsControl(control: Control3D): boolean;
        /**
         * Adds a control to the root child list
         * @param control defines the control to add
         * @returns the current manager
         */
        addControl(control: Control3D): GUI3DManager;
        /**
         * Removes a control from the root child list
         * @param control defines the control to remove
         * @returns the current container
         */
        removeControl(control: Control3D): GUI3DManager;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to transport BABYLON.Vector3 information for pointer events
     */
    export class Vector3WithInfo extends BABYLON.Vector3 {
        /** defines the current mouse button index */
        buttonIndex: number;
        /**
         * Creates a new Vector3WithInfo
         * @param source defines the vector3 data to transport
         * @param buttonIndex defines the current mouse button index
         */
        constructor(source: BABYLON.Vector3, 
        /** defines the current mouse button index */
        buttonIndex?: number);
    }
}
declare module BABYLON.GUI {
    /**
     * Class used as base class for controls
     */
    export class Control3D implements BABYLON.IDisposable, BABYLON.IBehaviorAware<Control3D> {
        /** Defines the control name */
        name?: string | undefined;
        /** @hidden */
        _host: GUI3DManager;
        private _node;
        private _downCount;
        private _enterCount;
        private _downPointerIds;
        private _isVisible;
        /** Gets or sets the control position  in world space */
        get position(): BABYLON.Vector3;
        set position(value: BABYLON.Vector3);
        /** Gets or sets the control scaling  in world space */
        get scaling(): BABYLON.Vector3;
        set scaling(value: BABYLON.Vector3);
        /** Callback used to start pointer enter animation */
        pointerEnterAnimation: () => void;
        /** Callback used to start pointer out animation */
        pointerOutAnimation: () => void;
        /** Callback used to start pointer down animation */
        pointerDownAnimation: () => void;
        /** Callback used to start pointer up animation */
        pointerUpAnimation: () => void;
        /**
         * An event triggered when the pointer move over the control
         */
        onPointerMoveObservable: BABYLON.Observable<BABYLON.Vector3>;
        /**
         * An event triggered when the pointer move out of the control
         */
        onPointerOutObservable: BABYLON.Observable<Control3D>;
        /**
         * An event triggered when the pointer taps the control
         */
        onPointerDownObservable: BABYLON.Observable<Vector3WithInfo>;
        /**
         * An event triggered when pointer is up
         */
        onPointerUpObservable: BABYLON.Observable<Vector3WithInfo>;
        /**
         * An event triggered when a control is clicked on (with a mouse)
         */
        onPointerClickObservable: BABYLON.Observable<Vector3WithInfo>;
        /**
         * An event triggered when pointer enters the control
         */
        onPointerEnterObservable: BABYLON.Observable<Control3D>;
        /**
         * Gets or sets the parent container
         */
        parent: BABYLON.Nullable<Container3D>;
        private _behaviors;
        /**
         * Gets the list of attached behaviors
         * @see https://doc.babylonjs.com/features/behaviour
         */
        get behaviors(): BABYLON.Behavior<Control3D>[];
        /**
         * Attach a behavior to the control
         * @see https://doc.babylonjs.com/features/behaviour
         * @param behavior defines the behavior to attach
         * @returns the current control
         */
        addBehavior(behavior: BABYLON.Behavior<Control3D>): Control3D;
        /**
         * Remove an attached behavior
         * @see https://doc.babylonjs.com/features/behaviour
         * @param behavior defines the behavior to attach
         * @returns the current control
         */
        removeBehavior(behavior: BABYLON.Behavior<Control3D>): Control3D;
        /**
         * Gets an attached behavior by name
         * @param name defines the name of the behavior to look for
         * @see https://doc.babylonjs.com/features/behaviour
         * @returns null if behavior was not found else the requested behavior
         */
        getBehaviorByName(name: string): BABYLON.Nullable<BABYLON.Behavior<Control3D>>;
        /** Gets or sets a boolean indicating if the control is visible */
        get isVisible(): boolean;
        set isVisible(value: boolean);
        /**
         * Creates a new control
         * @param name defines the control name
         */
        constructor(
        /** Defines the control name */
        name?: string | undefined);
        /**
         * Gets a string representing the class name
         */
        get typeName(): string;
        /**
         * Get the current class name of the control.
         * @returns current class name
         */
        getClassName(): string;
        protected _getTypeName(): string;
        /**
         * Gets the transform node used by this control
         */
        get node(): BABYLON.Nullable<BABYLON.TransformNode>;
        /**
         * Gets the mesh used to render this control
         */
        get mesh(): BABYLON.Nullable<BABYLON.AbstractMesh>;
        /**
         * Link the control as child of the given node
         * @param node defines the node to link to. Use null to unlink the control
         * @returns the current control
         */
        linkToTransformNode(node: BABYLON.Nullable<BABYLON.TransformNode>): Control3D;
        /** @hidden **/
        _prepareNode(scene: BABYLON.Scene): void;
        protected _injectGUI3DReservedDataStore(node: BABYLON.TransformNode): any;
        /**
         * Node creation.
         * Can be overriden by children
         * @param scene defines the scene where the node must be attached
         * @returns the attached node or null if none. Must return a BABYLON.Mesh or BABYLON.AbstractMesh if there is an atttached visible object
         */
        protected _createNode(scene: BABYLON.Scene): BABYLON.Nullable<BABYLON.TransformNode>;
        /**
         * Affect a material to the given mesh
         * @param mesh defines the mesh which will represent the control
         */
        protected _affectMaterial(mesh: BABYLON.AbstractMesh): void;
        /** @hidden */
        _onPointerMove(target: Control3D, coordinates: BABYLON.Vector3): void;
        /** @hidden */
        _onPointerEnter(target: Control3D): boolean;
        /** @hidden */
        _onPointerOut(target: Control3D): void;
        /** @hidden */
        _onPointerDown(target: Control3D, coordinates: BABYLON.Vector3, pointerId: number, buttonIndex: number): boolean;
        /** @hidden */
        _onPointerUp(target: Control3D, coordinates: BABYLON.Vector3, pointerId: number, buttonIndex: number, notifyClick: boolean): void;
        /** @hidden */
        forcePointerUp(pointerId?: BABYLON.Nullable<number>): void;
        /** @hidden */
        _processObservables(type: number, pickedPoint: BABYLON.Vector3, pointerId: number, buttonIndex: number): boolean;
        /** @hidden */
        _disposeNode(): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * The base class for controls that display content
     */
    export class ContentDisplay3D extends Control3D {
        private _content;
        private _facadeTexture;
        protected _contentResolution: number;
        protected _contentScaleRatio: number;
        /**
         * Gets or sets the GUI 2D content used to display the button's facade
         */
        get content(): Control;
        set content(value: Control);
        /**
         * Gets or sets the texture resolution used to render content (512 by default)
         */
        get contentResolution(): number;
        set contentResolution(value: number);
        protected _disposeFacadeTexture(): void;
        protected _resetContent(): void;
        /**
         * Apply the facade texture (created from the content property).
         * This function can be overloaded by child classes
         * @param facadeTexture defines the AdvancedDynamicTexture to use
         */
        protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used as a root to all buttons
     */
    export class AbstractButton3D extends ContentDisplay3D {
        /**
         * Creates a new button
         * @param name defines the control name
         */
        constructor(name?: string);
        protected _getTypeName(): string;
        protected _createNode(scene: BABYLON.Scene): BABYLON.TransformNode;
    }
}
declare module BABYLON.GUI {
    /**
     * Abstract class used to create a container panel deployed on the surface of a volume
     */
    export abstract class VolumeBasedPanel extends Container3D {
        private _columns;
        private _rows;
        private _rowThenColum;
        private _orientation;
        protected _cellWidth: number;
        protected _cellHeight: number;
        /**
         * Gets or sets the distance between elements
         */
        margin: number;
        /**
         * Gets or sets the orientation to apply to all controls (BABYLON.Container3D.FaceOriginReversedOrientation by default)
        * | Value | Type                                | Description |
        * | ----- | ----------------------------------- | ----------- |
        * | 0     | UNSET_ORIENTATION                   |  Control rotation will remain unchanged |
        * | 1     | FACEORIGIN_ORIENTATION              |  Control will rotate to make it look at sphere central axis |
        * | 2     | FACEORIGINREVERSED_ORIENTATION      |  Control will rotate to make it look back at sphere central axis |
        * | 3     | FACEFORWARD_ORIENTATION             |  Control will rotate to look at z axis (0, 0, 1) |
        * | 4     | FACEFORWARDREVERSED_ORIENTATION     |  Control will rotate to look at negative z axis (0, 0, -1) |
         */
        get orientation(): number;
        set orientation(value: number);
        /**
         * Gets or sets the number of columns requested (10 by default).
         * The panel will automatically compute the number of rows based on number of child controls.
         */
        get columns(): BABYLON.int;
        set columns(value: BABYLON.int);
        /**
         * Gets or sets a the number of rows requested.
         * The panel will automatically compute the number of columns based on number of child controls.
         */
        get rows(): BABYLON.int;
        set rows(value: BABYLON.int);
        /**
         * Creates new VolumeBasedPanel
         */
        constructor();
        protected _arrangeChildren(): void;
        /** Child classes must implement this function to provide correct control positioning */
        protected abstract _mapGridNode(control: Control3D, nodePosition: BABYLON.Vector3): void;
        /** Child classes can implement this function to provide additional processing */
        protected _finalProcessing(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a container panel deployed on the surface of a cylinder
     */
    export class CylinderPanel extends VolumeBasedPanel {
        private _radius;
        /**
         * Gets or sets the radius of the cylinder where to project controls (5 by default)
         */
        get radius(): BABYLON.float;
        set radius(value: BABYLON.float);
        protected _mapGridNode(control: Control3D, nodePosition: BABYLON.Vector3): void;
        private _cylindricalMapping;
    }
}
declare module BABYLON.GUI {
    /** @hidden */
    export var fluentVertexShader: {
        name: string;
        shader: string;
    };
}
declare module BABYLON.GUI {
    /** @hidden */
    export var fluentPixelShader: {
        name: string;
        shader: string;
    };
}
declare module BABYLON.GUI {
    /** @hidden */
    export class FluentMaterialDefines extends BABYLON.MaterialDefines {
        INNERGLOW: boolean;
        BORDER: boolean;
        HOVERLIGHT: boolean;
        TEXTURE: boolean;
        constructor();
    }
    /**
     * Class used to render controls with fluent desgin
     */
    export class FluentMaterial extends BABYLON.PushMaterial {
        /**
         * Gets or sets inner glow intensity. A value of 0 means no glow (default is 0.5)
         */
        innerGlowColorIntensity: number;
        /**
         * Gets or sets the inner glow color (white by default)
         */
        innerGlowColor: BABYLON.Color3;
        /**
         * Gets or sets the albedo color (Default is BABYLON.Color3(0.3, 0.35, 0.4))
         */
        albedoColor: BABYLON.Color3;
        /**
         * Gets or sets a boolean indicating if borders must be rendered (default is false)
         */
        renderBorders: boolean;
        /**
         * Gets or sets border width (default is 0.5)
         */
        borderWidth: number;
        /**
         * Gets or sets a value indicating the smoothing value applied to border edges (0.02 by default)
         */
        edgeSmoothingValue: number;
        /**
         * Gets or sets the minimum value that can be applied to border width (default is 0.1)
         */
        borderMinValue: number;
        /**
         * Gets or sets a boolean indicating if hover light must be rendered (default is false)
         */
        renderHoverLight: boolean;
        /**
         * Gets or sets the radius used to render the hover light (default is 1.0)
         */
        hoverRadius: number;
        /**
         * Gets or sets the color used to render the hover light (default is BABYLON.Color4(0.3, 0.3, 0.3, 1.0))
         */
        hoverColor: BABYLON.Color4;
        /**
         * Gets or sets the hover light position in world space (default is BABYLON.Vector3.Zero())
         */
        hoverPosition: BABYLON.Vector3;
        private _albedoTexture;
        /** Gets or sets the texture to use for albedo color */
        albedoTexture: BABYLON.Nullable<BABYLON.BaseTexture>;
        /**
         * Creates a new Fluent material
         * @param name defines the name of the material
         * @param scene defines the hosting scene
         */
        constructor(name: string, scene: BABYLON.Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): BABYLON.Nullable<BABYLON.BaseTexture>;
        isReadyForSubMesh(mesh: BABYLON.AbstractMesh, subMesh: BABYLON.SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: BABYLON.Matrix, mesh: BABYLON.Mesh, subMesh: BABYLON.SubMesh): void;
        getActiveTextures(): BABYLON.BaseTexture[];
        hasTexture(texture: BABYLON.BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): FluentMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: BABYLON.Scene, rootUrl: string): FluentMaterial;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a holographic button in 3D
     */
    export class HolographicButton extends Button3D {
        private _backPlate;
        private _textPlate;
        private _frontPlate;
        private _text;
        private _imageUrl;
        private _shareMaterials;
        private _frontMaterial;
        private _backMaterial;
        private _plateMaterial;
        private _pickedPointObserver;
        private _tooltipFade;
        private _tooltipTextBlock;
        private _tooltipTexture;
        private _tooltipMesh;
        private _tooltipHoverObserver;
        private _tooltipOutObserver;
        private _disposeTooltip;
        /**
         * Rendering ground id of all the mesh in the button
         */
        set renderingGroupId(id: number);
        get renderingGroupId(): number;
        /**
         * Text to be displayed on the tooltip shown when hovering on the button. When set to null tooltip is disabled. (Default: null)
         */
        set tooltipText(text: BABYLON.Nullable<string>);
        get tooltipText(): BABYLON.Nullable<string>;
        /**
         * Gets or sets text for the button
         */
        get text(): string;
        set text(value: string);
        /**
         * Gets or sets the image url for the button
         */
        get imageUrl(): string;
        set imageUrl(value: string);
        /**
         * Gets the back material used by this button
         */
        get backMaterial(): FluentMaterial;
        /**
         * Gets the front material used by this button
         */
        get frontMaterial(): FluentMaterial;
        /**
         * Gets the plate material used by this button
         */
        get plateMaterial(): BABYLON.StandardMaterial;
        /**
         * Gets a boolean indicating if this button shares its material with other HolographicButtons
         */
        get shareMaterials(): boolean;
        /**
         * Creates a new button
         * @param name defines the control name
         */
        constructor(name?: string, shareMaterials?: boolean);
        protected _getTypeName(): string;
        private _rebuildContent;
        protected _createNode(scene: BABYLON.Scene): BABYLON.TransformNode;
        protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
        private _createBackMaterial;
        private _createFrontMaterial;
        private _createPlateMaterial;
        protected _affectMaterial(mesh: BABYLON.Mesh): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /** @hidden */
    export var fluentButtonPixelShader: {
        name: string;
        shader: string;
    };
}
declare module BABYLON.GUI {
    /** @hidden */
    export var fluentButtonVertexShader: {
        name: string;
        shader: string;
    };
}
declare module BABYLON.GUI {
    /**
     * Class used to render square buttons with fluent desgin
     */
    export class FluentButtonMaterial extends BABYLON.PushMaterial {
        /**
         * URL pointing to the texture used to define the coloring for the fluent blob effect.
         */
        static BLOB_TEXTURE_URL: string;
        /**
         * Gets or sets the width of the glowing edge, relative to the scale of the button.
         * (Default is 4% of the height).
         */
        edgeWidth: number;
        /**
         * Gets or sets the color of the glowing edge.
         */
        edgeColor: BABYLON.Color4;
        /**
         * Gets or sets the maximum intensity of the proximity light.
         */
        proximityMaxIntensity: number;
        /**
         * Gets or sets the maximum distance for the proximity light (Default is 16mm).
         */
        proximityFarDistance: number;
        /**
         * Gets or sets the radius of the proximity light when near to the surface.
         */
        proximityNearRadius: number;
        /**
         * Gets or sets the anisotropy of the proximity light.
         */
        proximityAnisotropy: number;
        /**
         * Gets or sets the amount of fuzzing in the selection focus.
         */
        selectionFuzz: number;
        /**
         * Gets or sets an override value to display the button as selected.
         */
        selected: number;
        /**
         * Gets or sets a value to manually fade the blob size.
         */
        selectionFade: number;
        /**
         * Gets or sets a value to manually shrink the blob size as it fades (see selectionFade).
         */
        selectionFadeSize: number;
        /**
         * Gets or sets the distance from the button the cursor should be for the button
         * to appear selected (Default is 8cm).
         */
        selectedDistance: number;
        /**
         * Gets or sets the fall-off distance for the selection fade (Default is 8cm).
         */
        selectedFadeLength: number;
        /**
         * Gets or sets the intensity of the luminous blob (Ranges 0-1, default is 0.5).
         */
        blobIntensity: number;
        /**
         * The size of the blob when the pointer is at the blobFarDistance (Default is 5cm).
         */
        blobFarSize: number;
        /**
         * The distance at which the pointer is considered near. See [left|right]BlobNearSize. (Default is 0cm).
         */
        blobNearDistance: number;
        /**
         * The distance at which the pointer is considered far. See [left|right]BlobFarSize. (Default is 8cm).
         */
        blobFarDistance: number;
        /**
         * The distance over which the blob intensity fades from full to none (Default is 8cm).
         */
        blobFadeLength: number;
        /**
         * Gets or sets whether the blob corresponding to the left index finger is enabled.
         */
        leftBlobEnable: boolean;
        /**
         * Gets or sets the size of the left blob when the left pointer is considered near. See blobNearDistance. (Default is 2.5cm).
         */
        leftBlobNearSize: number;
        /**
         * Gets or sets the progress of the pulse animation on the left blob (Ranges 0-1).
         */
        leftBlobPulse: number;
        /**
         * Gets or sets the fade factor on the left blob.
         */
        leftBlobFade: number;
        /**
         * Gets or sets the inner fade on the left blob;
         */
        leftBlobInnerFade: number;
        /**
         * Gets or sets whether the blob corresponding to the right index finger is enabled.
         */
        rightBlobEnable: boolean;
        /**
         * Gets or sets the size of the right blob when the right pointer is considered near. See blobNearDistance. (Default is 2.5cm).
         */
        rightBlobNearSize: number;
        /**
         * Gets or sets the progress of the pulse animation on the right blob (Ranges 0-1).
         */
        rightBlobPulse: number;
        /**
         * Gets or sets the fade factor on the right blob.
         */
        rightBlobFade: number;
        /**
         * Gets or sets the inner fade on the right blob;
         */
        rightBlobInnerFade: number;
        /**
         * Gets or sets the direction of the active face before the world transform is applied.
         * This should almost always be set to -z.
         */
        activeFaceDir: BABYLON.Vector3;
        /**
         * Gets or sets the button's up direction before the world transform is applied.
         * This should almost always be set to +y.
         */
        activeFaceUp: BABYLON.Vector3;
        /**
         * Gets or sets whether the edge fade effect is enabled.
         */
        enableFade: boolean;
        /**
         * Gets or sets a value corresponding to the width of the edge fade effect (Default 1.5).
         */
        fadeWidth: number;
        /**
         * Gets or sets whether the active face is smoothly interpolated.
         */
        smoothActiveFace: boolean;
        /**
         * Gets or sets whether the frame of the fluent button model is visible.
         * This is usually only enabled for debugging purposes.
         */
        showFrame: boolean;
        /**
         * Gets or sets whether the blob color texture is used for the proximity
         * light effect. This is usually only disabled for debugging purposes.
         */
        useBlobTexture: boolean;
        /**
         * Gets or sets the world-space position of the tip of the left index finger.
         */
        globalLeftIndexTipPosition: BABYLON.Vector3;
        /**
         * Gets or sets the world-space position of the tip of the right index finger.
         */
        globalRightIndexTipPosition: BABYLON.Vector3;
        private _blobTexture;
        constructor(name: string, scene: BABYLON.Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): BABYLON.Nullable<BABYLON.BaseTexture>;
        isReadyForSubMesh(mesh: BABYLON.AbstractMesh, subMesh: BABYLON.SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: BABYLON.Matrix, mesh: BABYLON.Mesh, subMesh: BABYLON.SubMesh): void;
        /**
         * Get the list of animatables in the material.
         * @returns the list of animatables object used in the material
         */
        getAnimatables(): BABYLON.IAnimatable[];
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): FluentButtonMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: BABYLON.Scene, rootUrl: string): FluentButtonMaterial;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a holographic button in 3D
     */
    export class TouchHolographicButton extends TouchButton3D {
        /**
         * Base Url for the button model.
         */
        static MODEL_BASE_URL: string;
        /**
         * File name for the button model.
         */
        static MODEL_FILENAME: string;
        private _backPlate;
        private _textPlate;
        private _frontPlate;
        private _text;
        private _imageUrl;
        private _shareMaterials;
        private _frontMaterial;
        private _backMaterial;
        private _plateMaterial;
        private _pickedPointObserver;
        private _pointerHoverObserver;
        private _tooltipFade;
        private _tooltipTextBlock;
        private _tooltipTexture;
        private _tooltipMesh;
        private _tooltipHoverObserver;
        private _tooltipOutObserver;
        private _disposeTooltip;
        /**
         * Rendering ground id of all the mesh in the button
         */
        set renderingGroupId(id: number);
        get renderingGroupId(): number;
        /**
         * Text to be displayed on the tooltip shown when hovering on the button. When set to null tooltip is disabled. (Default: null)
         */
        set tooltipText(text: BABYLON.Nullable<string>);
        get tooltipText(): BABYLON.Nullable<string>;
        /**
         * Gets or sets text for the button
         */
        get text(): string;
        set text(value: string);
        /**
         * Gets or sets the image url for the button
         */
        get imageUrl(): string;
        set imageUrl(value: string);
        /**
         * Gets the back material used by this button
         */
        get backMaterial(): BABYLON.StandardMaterial;
        /**
         * Gets the front material used by this button
         */
        get frontMaterial(): FluentButtonMaterial;
        /**
         * Gets the plate material used by this button
         */
        get plateMaterial(): BABYLON.StandardMaterial;
        /**
         * Gets a boolean indicating if this button shares its material with other HolographicButtons
         */
        get shareMaterials(): boolean;
        /**
         * Creates a new button
         * @param name defines the control name
         */
        constructor(name?: string, shareMaterials?: boolean);
        protected _getTypeName(): string;
        private _rebuildContent;
        protected _createNode(scene: BABYLON.Scene): BABYLON.TransformNode;
        protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
        private _createBackMaterial;
        private _createFrontMaterial;
        private _createPlateMaterial;
        protected _affectMaterial(mesh: BABYLON.Mesh): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * BABYLON.Gizmo to resize 2D slates
     */
    export class SlateGizmo extends BABYLON.Gizmo {
        private _boundingDimensions;
        private _dragPlaneNormal;
        private _tmpQuaternion;
        private _tmpVector;
        private _corners;
        private _sides;
        private _handlesParent;
        private _boundingBoxGizmo;
        private _dragStartObserver;
        private _draggingObserver;
        private _dragEndObserver;
        private _dragBehavior;
        /**
         * Value we use to offset handles from mesh
         */
        private _margin;
        private _attachedSlate;
        /**
         * If set, the handles will increase in size based on the distance away from the camera to have a consistent screen size (Default: true)
         */
        fixedScreenSize: boolean;
        /**
         * The distance away from the object which the draggable meshes should appear world sized when fixedScreenSize is set to true (default: 10)
         */
        fixedScreenSizeDistanceFactor: number;
        /**
         * Size of the handles
         */
        handleSize: number;
        /**
         * The slate attached to this gizmo
         */
        set attachedSlate(control: BABYLON.Nullable<HolographicSlate>);
        get attachedSlate(): BABYLON.Nullable<HolographicSlate>;
        constructor(utilityLayer?: BABYLON.UtilityLayerRenderer);
        private _createNode;
        private _keepAspectRatio;
        private _clampDimensions;
        private _moveHandle;
        private _assignDragBehavior;
        private _createAngleMesh;
        private _createSideMesh;
        protected _attachedNodeChanged(value: BABYLON.Nullable<BABYLON.AbstractMesh>): void;
        /**
         * Updates the bounding box information for the gizmo
         */
        updateBoundingBox(): void;
        private _updateHandlesPosition;
        protected _update(): void;
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Default behavior for 3D UI elements.
     * Handles a BABYLON.FollowBehavior, SixDofBehavior and MultiPointerScaleBehavior
     */
    export class DefaultBehavior implements BABYLON.Behavior<BABYLON.Mesh> {
        private _scene;
        private _followBehavior;
        private _sixDofDragBehavior;
        private _onBeforeRender;
        /**
         * Instantiates the default behavior
         */
        constructor();
        /**
         * Attached node of this behavior
         */
        attachedNode: BABYLON.Nullable<BABYLON.Mesh>;
        /**
         *  The name of the behavior
         */
        get name(): string;
        /**
         *  The follow behavior
         */
        get followBehavior(): BABYLON.FollowBehavior;
        /**
         *  The six DoF drag behavior
         */
        get sixDofDragBehavior(): BABYLON.SixDofDragBehavior;
        /**
         * Enables the follow behavior
         */
        followBehaviorEnabled: boolean;
        /**
         * Enables the six DoF drag behavior
         */
        sixDofDragBehaviorEnabled: boolean;
        /**
         *  Initializes the behavior
         */
        init(): void;
        /**
         * Attaches the default behavior
         * @param ownerMesh The top level mesh
         * @param sixDofAnchorMesh A mesh that should behave as an anchor for the sixDof interaction. If unset, the top level mesh will be used
         */
        attach(ownerMesh: BABYLON.Mesh, sixDofAnchorMesh?: BABYLON.Mesh): void;
        /**
         *  Detaches the behavior from the mesh
         */
        detach(): void;
        private _addObservables;
        private _removeObservables;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a holographic slate
     */
    export class HolographicSlate extends ContentDisplay3D {
        /**
         * Base Url for the assets.
         */
        static ASSETS_BASE_URL: string;
        /**
         * File name for the close icon.
         */
        static CLOSE_ICON_FILENAME: string;
        /**
         * File name for the close icon.
         */
        static FOLLOW_ICON_FILENAME: string;
        /**
         * Dimensions of the slate
         */
        dimensions: BABYLON.Vector3;
        /**
         * Minimum dimensions of the slate
         */
        minDimensions: BABYLON.Vector3;
        /**
         * Dimensions of the backplate
         */
        backplateDimensions: BABYLON.Vector3;
        /**
         * Margin between backplate and contentplate
         */
        backPlateMargin: number;
        /**
         * Origin in local coordinates (top left corner)
         */
        origin: BABYLON.Vector3;
        private _backPlateMaterial;
        private _contentMaterial;
        private _pickedPointObserver;
        private _imageUrl;
        /** @hidden */
        _defaultBehavior: DefaultBehavior;
        /** @hidden */
        _gizmo: SlateGizmo;
        protected _backPlate: BABYLON.Mesh;
        protected _contentPlate: BABYLON.Mesh;
        protected _followButton: TouchHolographicButton;
        protected _closeButton: TouchHolographicButton;
        protected _contentScaleRatio: number;
        /**
         * Rendering ground id of all the mesh in the button
         */
        set renderingGroupId(id: number);
        get renderingGroupId(): number;
        /**
         * Gets or sets the image url for the button
         */
        get imageUrl(): string;
        set imageUrl(value: string);
        /**
         * Creates a new slate
         * @param name defines the control name
         */
        constructor(name?: string);
        /**
         * Apply the facade texture (created from the content property).
         * This function can be overloaded by child classes
         * @param facadeTexture defines the AdvancedDynamicTexture to use
         */
        protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
        private _rebuildContent;
        private _addControl;
        protected _getTypeName(): string;
        /**
         * @hidden
         */
        _positionElements(): void;
        /**
         * @hidden
         */
        _updatePivot(): void;
        protected _createNode(scene: BABYLON.Scene): BABYLON.TransformNode;
        protected _affectMaterial(mesh: BABYLON.AbstractMesh): void;
        /** @hidden **/
        _prepareNode(scene: BABYLON.Scene): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create an interactable object. It's a 3D button using a mesh coming from the current scene
     */
    export class MeshButton3D extends Button3D {
        /** @hidden */
        protected _currentMesh: BABYLON.Mesh;
        /**
         * Creates a new 3D button based on a mesh
         * @param mesh mesh to become a 3D button
         * @param name defines the control name
         */
        constructor(mesh: BABYLON.Mesh, name?: string);
        protected _getTypeName(): string;
        protected _createNode(scene: BABYLON.Scene): BABYLON.TransformNode;
        protected _affectMaterial(mesh: BABYLON.AbstractMesh): void;
    }
}
declare module BABYLON.GUI {
    /**
     * NearMenu that displays buttons and follows the camera
     */
    export class NearMenu extends VolumeBasedPanel {
        /**
         * Base Url for the assets.
         */
        private static ASSETS_BASE_URL;
        /**
         * File name for the close icon.
         */
        private static PIN_ICON_FILENAME;
        private _pinButton;
        private _backPlate;
        private _backPlateMaterial;
        private _pinMaterial;
        private _pickedPointObserver;
        private _defaultBehavior;
        private _currentMin;
        private _currentMax;
        private _isPinned;
        /**
         * Indicates if the near menu is world-pinned
         */
        get isPinned(): boolean;
        set isPinned(value: boolean);
        private _createPinButton;
        protected _createNode(scene: BABYLON.Scene): BABYLON.Nullable<BABYLON.TransformNode>;
        protected _affectMaterial(mesh: BABYLON.AbstractMesh): void;
        protected _mapGridNode(control: Control3D, nodePosition: BABYLON.Vector3): void;
        protected _finalProcessing(): void;
        /**
         * Creates a near menu GUI 3D control
         * @param name name of the near menu
         */
        constructor(name: string);
        /**
         * Adds a button to the near menu.
         * Please note that the back material of the button will be set to transparent as it is attached to the near menu.
         *
         * @param button Button to add
         * @returns This near menu
         */
        addButton(button: TouchHolographicButton): NearMenu;
        /**
         * This method should not be used directly. It is inherited from `Container3D`.
         * Please use `addButton` instead.
         * @param _control
         * @returns
         */
        addControl(_control: Control3D): Container3D;
        /**
         * Disposes the near menu
         */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a container panel deployed on the surface of a plane
     */
    export class PlanePanel extends VolumeBasedPanel {
        protected _mapGridNode(control: Control3D, nodePosition: BABYLON.Vector3): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a container panel where items get randomized planar mapping
     */
    export class ScatterPanel extends VolumeBasedPanel {
        private _iteration;
        /**
         * Gets or sets the number of iteration to use to scatter the controls (100 by default)
         */
        get iteration(): BABYLON.float;
        set iteration(value: BABYLON.float);
        protected _mapGridNode(control: Control3D, nodePosition: BABYLON.Vector3): void;
        private _scatterMapping;
        protected _finalProcessing(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a slider in 3D
     */
    export class Slider3D extends Control3D {
        private _sliderBarMaterial;
        private _sliderThumbMaterial;
        private _sliderThumb;
        private _sliderBar;
        private _minimum;
        private _maximum;
        private _value;
        private _step;
        /** BABYLON.Observable raised when the sldier value changes */
        onValueChangedObservable: BABYLON.Observable<number>;
        /**
         * Creates a new slider
         * @param name defines the control name
         */
        constructor(name?: string);
        /**
         * Gets the mesh used to render this control
         */
        get mesh(): BABYLON.Nullable<BABYLON.AbstractMesh>;
        /** Gets or sets minimum value */
        get minimum(): number;
        set minimum(value: number);
        /** Gets or sets maximum value */
        get maximum(): number;
        set maximum(value: number);
        /** Gets or sets step value */
        get step(): number;
        set step(value: number);
        /** Gets or sets current value */
        get value(): number;
        set value(value: number);
        protected get start(): number;
        protected get end(): number;
        /**
         * Gets the slider bar material used by this control
         */
        get sliderBarMaterial(): BABYLON.StandardMaterial;
        /**
         * Gets the slider thumb material used by this control
         */
        get sliderThumbMaterial(): BABYLON.StandardMaterial;
        protected _createNode(scene: BABYLON.Scene): BABYLON.TransformNode;
        protected _affectMaterial(mesh: BABYLON.AbstractMesh): void;
        private _createBehavior;
        private _convertToPosition;
        private _convertToValue;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a container panel deployed on the surface of a sphere
     */
    export class SpherePanel extends VolumeBasedPanel {
        private _radius;
        /**
         * Gets or sets the radius of the sphere where to project controls (5 by default)
         */
        get radius(): BABYLON.float;
        set radius(value: BABYLON.float);
        protected _mapGridNode(control: Control3D, nodePosition: BABYLON.Vector3): void;
        private _sphericalMapping;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a stack panel in 3D on XY plane
     */
    export class StackPanel3D extends Container3D {
        private _isVertical;
        /**
         * Gets or sets a boolean indicating if the stack panel is vertical or horizontal (horizontal by default)
         */
        get isVertical(): boolean;
        set isVertical(value: boolean);
        /**
         * Gets or sets the distance between elements
         */
        margin: number;
        /**
         * Creates new StackPanel
         * @param isVertical
         */
        constructor(isVertical?: boolean);
        protected _arrangeChildren(): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create an interactable object. It's a touchable 3D button using a mesh coming from the current scene
     */
    export class TouchMeshButton3D extends TouchButton3D {
        /** @hidden */
        protected _currentMesh: BABYLON.Mesh;
        /**
         * Creates a new 3D button based on a mesh
         * @param mesh mesh to become a 3D button
         * @param collisionMesh mesh to track collisions with
         * @param name defines the control name
         */
        constructor(mesh: BABYLON.Mesh, options: {
            collisionMesh: BABYLON.Mesh;
            useDynamicMesh?: boolean;
        }, name?: string);
        protected _getTypeName(): string;
        protected _createNode(scene: BABYLON.Scene): BABYLON.TransformNode;
        protected _affectMaterial(mesh: BABYLON.AbstractMesh): void;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used as base class for touch-enabled toggleable buttons
     */
    export class TouchToggleButton3D extends TouchButton3D {
        private _isPressed;
        /**
         * An event triggered when the button is toggled on
         */
        onToggleOnObservable: BABYLON.Observable<BABYLON.Vector3>;
        /**
         * An event triggered when the button is toggled off
         */
        onToggleOffObservable: BABYLON.Observable<BABYLON.Vector3>;
        /**
         * Creates a new button
         * @param name defines the control name
         * @param collisionMesh defines the mesh to track near interactions with
         */
        constructor(name?: string, collisionMesh?: BABYLON.Mesh);
        private _onToggle;
        protected _getTypeName(): string;
        protected _createNode(scene: BABYLON.Scene): BABYLON.TransformNode;
        protected _affectMaterial(mesh: BABYLON.AbstractMesh): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}
declare module BABYLON.GUI {
    /** @hidden */
    export var fluentBackplatePixelShader: {
        name: string;
        shader: string;
    };
}
declare module BABYLON.GUI {
    /** @hidden */
    export var fluentBackplateVertexShader: {
        name: string;
        shader: string;
    };
}
declare module BABYLON.GUI {
    /**
     * Class used to render square buttons with fluent desgin
     */
    export class FluentBackplateMaterial extends BABYLON.PushMaterial {
        /**
         * URL pointing to the texture used to define the coloring for the fluent blob effect.
         */
        static BLOB_TEXTURE_URL: string;
        /**
         * URL pointing to the texture used to define iridescent map.
         */
        static IM_TEXTURE_URL: string;
        private _blobTexture;
        private _iridescentMap;
        /**
         * Gets or sets the corner radius on the backplate. Best to keep this value between 0.01 and 0.5. Default is 0.03.
         */
        radius: number;
        /**
         * Gets or sets the line width of the backplate.
         */
        lineWidth: number;
        /**
         * Gets or sets whether to use absolute sizes when calculating effects on the backplate.
         * Since desktop and VR/AR have different relative sizes, it's usually best to keep this false.
         */
        absoluteSizes: boolean;
        /** @hidden */
        _filterWidth: number;
        /**
         * Gets or sets the base color of the backplate.
         */
        baseColor: BABYLON.Color4;
        /**
         * Gets or sets the line color of the backplate.
         */
        lineColor: BABYLON.Color4;
        /**
         * Gets or sets the intensity of the fluent hover glow effect.
         */
        blobIntensity: number;
        /**
         * Gets or sets the far size of the fluent hover glow effect.
         */
        blobFarSize: number;
        /**
         * Gets or sets the distance considered "near" to the backplate, which controls the size of the fluent hover glow effect (see blobNearSize).
         */
        blobNearDistance: number;
        /**
         * Gets or sets the distance considered "far" from the backplate, which controls the size of the fluent hover glow effect (see blobFarSize).
         */
        blobFarDistance: number;
        /**
         * Gets or sets the length of the fluent hover glow effect fade.
         */
        blobFadeLength: number;
        /**
         * Gets or sets the size of the fluent hover glow effect when the left pointer is considered "near" to the backplate (see blobNearDistance).
         */
        blobNearSize: number;
        /**
         * Gets or sets the progress of the fluent hover glow effect selection animation corresponding to the left pointer (0.0 - 1.0).
         */
        blobPulse: number;
        /**
         * Gets or sets the opacity of the fluent hover glow effect corresponding to the left pointer (0.0 - 1.0). Default is 0.
         */
        blobFade: number;
        /**
         * Gets or sets the size of the fluent hover glow effect when the right pointer is considered "near" to the backplate (see blobNearDistance).
         */
        blobNearSize2: number;
        /**
         * Gets or sets the progress of the fluent hover glow effect selection animation corresponding to the right pointer (0.0 - 1.0).
         */
        blobPulse2: number;
        /**
         * Gets or sets the opacity of the fluent hover glow effect corresponding to the right pointer (0.0 - 1.0). Default is 0.
         */
        blobFade2: number;
        /** @hidden */
        _rate: number;
        /**
         * Gets or sets the color of the highlights on the backplate line.
         */
        highlightColor: BABYLON.Color4;
        /**
         * Gets or sets the width of the highlights on the backplate line.
         */
        highlightWidth: number;
        /** @hidden */
        _highlightTransform: BABYLON.Vector4;
        /** @hidden */
        _highlight: number;
        /**
         * Gets or sets the intensity of the iridescence effect.
         */
        iridescenceIntensity: number;
        /**
         * Gets or sets the intensity of the iridescence effect on the backplate edges.
         */
        iridescenceEdgeIntensity: number;
        /** @hidden */
        _angle: number;
        /**
         * Gets or sets the opacity of the backplate (0.0 - 1.0).
         */
        fadeOut: number;
        /** @hidden */
        _reflected: boolean;
        /** @hidden */
        _frequency: number;
        /** @hidden */
        _verticalOffset: number;
        /**
         * Gets or sets the world-space position of the tip of the left index finger.
         */
        globalLeftIndexTipPosition: BABYLON.Vector3;
        private _globalLeftIndexTipPosition4;
        /**
         * Gets or sets the world-space position of the tip of the right index finger.
         */
        globalRightIndexTipPosition: BABYLON.Vector3;
        private _globalRightIndexTipPosition4;
        constructor(name: string, scene: BABYLON.Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): BABYLON.Nullable<BABYLON.BaseTexture>;
        isReadyForSubMesh(mesh: BABYLON.AbstractMesh, subMesh: BABYLON.SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: BABYLON.Matrix, mesh: BABYLON.Mesh, subMesh: BABYLON.SubMesh): void;
        /**
         * Get the list of animatables in the material.
         * @returns the list of animatables object used in the material
         */
        getAnimatables(): BABYLON.IAnimatable[];
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): FluentBackplateMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: BABYLON.Scene, rootUrl: string): FluentBackplateMaterial;
    }
}
declare module BABYLON.GUI {
    /**
     * Class used to create a holographic backplate in 3D
     */
    export class HolographicBackplate extends Control3D {
        private _shareMaterials;
        /**
         * Base Url for the button model.
         */
        static MODEL_BASE_URL: string;
        /**
         * File name for the button model.
         */
        static MODEL_FILENAME: string;
        private _model;
        private _material;
        /**
         * Rendering ground id of the backplate mesh.
         */
        set renderingGroupId(id: number);
        get renderingGroupId(): number;
        /**
         * Gets the material used by the backplate
         */
        get material(): FluentBackplateMaterial;
        /**
         * Gets a boolean indicating if this backplate shares its material with other HolographicBackplates
         */
        get shareMaterials(): boolean;
        /**
         * Creates a new holographic backplate
         * @param name defines the control name
         */
        constructor(name?: string, _shareMaterials?: boolean);
        protected _getTypeName(): string;
        protected _createNode(scene: BABYLON.Scene): BABYLON.TransformNode;
        private _createMaterial;
        protected _affectMaterial(mesh: BABYLON.Mesh): void;
        /**
         * Releases all associated resources
         */
        dispose(): void;
    }
}