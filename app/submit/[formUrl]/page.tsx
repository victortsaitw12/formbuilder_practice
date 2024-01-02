"use client";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";
import useDesigner from "@/components/hooks/useDesigner";

async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {

  const { elements } = useDesigner();
  return <FormSubmitComponent formUrl={params.formUrl} content={elements} />;
}

export default SubmitPage;