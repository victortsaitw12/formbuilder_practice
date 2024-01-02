import React from "react";
import SidebarElementBtn from "./SidebarElementBtn";
import { FormElements } from "./FormElements";
import { Separator } from "./ui/separator";

function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-foreground">請拖拉元件以建立表單</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-foreground col-span-1 md:col-span-2 my-2 place-self-start">Layout元件</p>
        <SidebarElementBtn formElement={FormElements.TitleField} />
        <SidebarElementBtn formElement={FormElements.SubTitleField} />
        <SidebarElementBtn formElement={FormElements.ParagraphField} />
        <SidebarElementBtn formElement={FormElements.SeparatorField} />
        <SidebarElementBtn formElement={FormElements.SpacerField} />

        <p className="text-sm text-foreground col-span-1 md:col-span-2 my-2 place-self-start">表單元件</p>
        <SidebarElementBtn formElement={FormElements.TextField} />
        <SidebarElementBtn formElement={FormElements.NumberField} />
        <SidebarElementBtn formElement={FormElements.TextAreaField} />
        <SidebarElementBtn formElement={FormElements.DateField} />
        <SidebarElementBtn formElement={FormElements.SelectField} />
        <SidebarElementBtn formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
}

export default FormElementsSidebar;