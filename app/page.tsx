"use client";

import Designer from '@/components/Designer'
import Image from 'next/image'
import {DndContext} from '@dnd-kit/core';
import SaveFormBtn from "@/components/SaveFormBtn";

export default function Home() {
  return (
    <main className='w-full h-full'>
      <DndContext>
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">表單建立模組</span>
            </h2>
            <div className="flex items-center gap-2">
              <SaveFormBtn id={1999} />
            </div>
          </nav>
          <Designer />
      </DndContext>
    </main>
  )
}
