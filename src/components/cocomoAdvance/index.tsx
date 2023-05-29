import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select } from "@material-tailwind/react";

function CocomoAdvanced() {
  const [open, setOpen] = useState(false);
  const [kloc, setKloc] = useState(0);
  const [tipoProyecto, setTipoProyecto] = useState("orgánico");
  const [resultado, setResultado]: any = useState(null);
  const handleOpen = () => setOpen(!open);
  const handleSelect = (e: any) => {
   setTipoProyecto(e)
  }
  const calcular = () => {
    let a: any, b: any, c: any, d: any;

    if (tipoProyecto === "orgánico") {
      a = 2.4;
      b = 1.05;
      c = 2.5;
      d = 0.38;
    } else if (tipoProyecto === "semiacoplado") {
      a = 3.0;
      b = 1.12;
      c = 2.5;
      d = 0.35;
    } else if (tipoProyecto === "incrustado") {
      a = 3.6;
      b = 1.20;
      c = 2.5;
      d = 0.32;
    } else {
      alert("Tipo de proyecto no válido.");
    }

    const esfuerzo = a * Math.pow(kloc, b);
    const tiempo = c * Math.pow(esfuerzo, d);
    const programadores = parseFloat(esfuerzo as any) / parseFloat (tiempo as any);
    setOpen(true);
    setResultado({
      esfuerzo: esfuerzo.toFixed(2),
      tiempo: tiempo.toFixed(2),
      programadores: programadores.toFixed(2)
    });
  };

  return (
    <div className="flex flex-col justify-center container gap-5 pt-10">
      <Input
        type="number"
        label="Tamaño del proyecto en KLOC"
        value={kloc}
        onChange={(e) => setKloc(parseFloat(e.target.value))}
      />
        
        <Select color="orange" label="Tipo de proyecto" value={tipoProyecto} onChange={handleSelect}>
          <Option value="orgánico">Orgánico</Option>
          <Option value="semiacoplado">Semiacoplado</Option>
          <Option value="incrustado">Incrustado</Option>
        </Select>


      <Button color="orange" onClick={calcular}>Calcular</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Resultados</DialogHeader>
        <DialogBody divider id='modalBody' className='flex flex-col'>
          {resultado && (
            <div>
              <p>Esfuerzo en personas-mes: {resultado.esfuerzo}</p>
              <p>Tiempo de desarrollo en meses: {resultado.tiempo}</p>
              <p>Número de programadores requeridos: {resultado.programadores}</p>
            </div>
          )}
        </DialogBody>
        <DialogFooter className='gap-3 flex justify-center'>
          <Button variant="gradient" color="orange" onClick={() => {
            handleOpen();
          }}>
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default CocomoAdvanced;
