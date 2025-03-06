import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

//Dependency Injection
//const service = new NinjasService();
//const controller = new NinjasController(service);
@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) {
        
    }
    //GET /ninjas?weapon=fast --> []
    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
        //const service = new NinjasService();
        return this.ninjasService.getNinjas(weapon);
    }

    //GET / ninjas/:id --> { ... }
    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id: number) {  //pipes
        try {
            return this.ninjasService.getNinja(id);
        } catch (err) {
            throw new NotFoundException();
        }
        

            
    }

    //POST /ninjas
    @Post()
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto ) {
        return this.ninjasService.createNinja(createNinjaDto);
    }

    //PUT ninjas/:id --> { ... }
    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return this.ninjasService.updateNinja(+id, updateNinjaDto);
    }

    //Delete /ninjas/:id
    @Delete(':id')
    removeNinja(@Param('id') id: string) {
        return this.ninjasService.removeNinja(+id)
        
    }


}
