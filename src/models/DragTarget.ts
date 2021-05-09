interface DragTarget {
    dragOverHandler(event: DragEvent): void;

    dragLeaveHandler(event: DragEvent): void;

    dropHandler(event: DragEvent): void;
}

export default DragTarget;