import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface Row {
  id: string;
  name: string;
  age: number;
  email: string;
}

interface DragAndDropTableProps {
  initialData: Row[];
}

const DragAndDropTable: React.FC<DragAndDropTableProps> = ({ initialData }) => {
  const [data, setData] = React.useState<Row[]>(initialData);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return; // Dropped outside

    const reorderedData = Array.from(data);
    const [removed] = reorderedData.splice(source.index, 1);
    reorderedData.splice(destination.index, 0, removed);

    setData(reorderedData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="table-body">
        {(provided) => (
          <tbody ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((row, index) => (
              <Draggable key={row.id} draggableId={row.id} index={index}>
                {(provided) => (
                  <tr
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      background: "white",
                      border: "1px solid #ccc",
                    }}
                  >
                    <td>{row.name}</td>
                    <td>{row.age}</td>
                    <td>{row.email}</td>
                  </tr>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropTable;
