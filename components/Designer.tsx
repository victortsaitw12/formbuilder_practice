// "use client";

import React, {useState} from 'react'
import DesignerSidebar from './DesignerSidebar'
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core"
import { ElementsType, FormElementInstance, FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { idGenerator } from "@/lib/idGenerator";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";

function Designer() {
  const { elements, addElement, removeElement, selectedElement, setSelectedElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
        isDesignerDropArea: true
    }
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea;

      const droppingSidebarBtnOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignerDropArea;

      // First scenario
      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());

        addElement(elements.length, newElement);
        return;
      }
    }
  });

  return (
    <div className='flex w-full h-full'>
        <div className='p-4 w-full'  
          onClick={() => {
            if (selectedElement) setSelectedElement(null);
          }}
        >
            <div ref={droppable.setNodeRef}
                className='bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto'>
                 {elements.length > 0 && (
                    <div className="flex flex-col  w-full gap-2 p-4">
                      {elements.map((element) => (
                        <DesignerElementWrapper key={element.id} element={element} />
                      ))}
                    </div>
                  )}
            </div>
        </div>
        <DesignerSidebar />
    </div>
  )
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full z-40">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation(); // avoid selection of element while deleting
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-40">
            <p className="text-red-500 text-xl font-bold">點擊修改屬性</p>
          </div>
        </>
      )}
      <div  className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30",
      )}>
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  )
}

export default Designer