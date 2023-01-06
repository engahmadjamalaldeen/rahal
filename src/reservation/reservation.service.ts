import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityRepository } from 'src/cities/city.repository';
import { CustomerRepository } from 'src/customers/customer.repository';
import { Gender, Status } from 'src/customers/dto/create-customer-dto';
import { PlaceRepository } from 'src/places/place.repository';
import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { RoomRepository } from 'src/rooms/room.repository';
import { CreateClientReservationDto, Operation } from './dto/create-client-reservation-dto';
import { CreateReservationDto } from './dto/create-reservation-dto';
import { Reservation } from './reservation.entity';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(ReservationRepository)
        private reservationRepository: ReservationRepository,
        @InjectRepository(PlaceRepository)
        private placeRepository: PlaceRepository,
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository,
        @InjectRepository(RoomRepository)
        private roomRepository: RoomRepository,
        @InjectRepository(ReservationTypeRepository)
        private reservationTypeRepository: ReservationTypeRepository,
        @InjectRepository(CityRepository)
        private cityRepository: CityRepository,
    ) { }


    async getReservations(): Promise<Reservation[]> {
        const found = await this.reservationRepository.find({relations: ['room', 'place', 'customer']});
        // const found = await this.reservationRepository.createQueryBuilder('Reservation')
        //     .leftJoinAndSelect('Reservation.room', 'room')
        //     .leftJoinAndSelect('Reservation.place', 'place')
        //     .leftJoinAndSelect('Reservation.customer', 'customer')
        //     .getMany()

        for(let i = 0; i < found.length; i++){
            delete found[i].customer.salt;
            delete found[i].customer.password;
            delete found[i].customer.accessToken;
            delete found[i].place.reservations;
        }
        return found;
    }

    async getReservationsByFilters(roomId: number, reservationTypeId: number, fromDate: string, toDate: string) {
        const room = await this.roomRepository.findOne({where: {id: roomId}});
        // return room;
        // if(!room){
        // } else {     
            
            let reservationsBasedOnRoom = await this.reservationRepository.createQueryBuilder('Reservation').where({room: room}).getMany();

            let reservations = [];
            let fromDateTime = new Date(fromDate);
            let toDateTime = new Date(toDate);
            for(let i = 0; i < reservationsBasedOnRoom.length; i++){
                let reservationFromDate = new Date(reservationsBasedOnRoom[i].fromDate);
                let reservationToDate = new Date(reservationsBasedOnRoom[i].toDate);
                if((fromDateTime <= reservationFromDate && toDateTime >= reservationToDate 
                    || (toDateTime >= reservationFromDate && fromDateTime <= reservationFromDate))
                    || (fromDateTime <= reservationToDate && toDateTime >= reservationToDate)){
                        reservations.push(reservationsBasedOnRoom[i]);
                }
            }
        const reservationTyp = await this.reservationTypeRepository.findOne({where: {id: reservationTypeId}});
        const placeId = reservationTyp.placeId;
        const place = await this.placeRepository.findOne({where: {id: placeId}});
        // return place;
            let reservationsBasedOnReservationTyp = await this.reservationRepository
            .createQueryBuilder('Reservation')
            .where({place: place})
            .getMany();
            
            let reservations1 = [];
            let fromDateTime1 = new Date(fromDate);
            let toDateTime1 = new Date(toDate);
            for(let i = 0; i < reservationsBasedOnReservationTyp.length; i++){
                let reservationFromDate = new Date(reservationsBasedOnReservationTyp[i].fromDate);
                let reservationToDate = new Date(reservationsBasedOnReservationTyp[i].toDate);
                if((fromDateTime1 <= reservationFromDate && toDateTime1 >= reservationToDate 
                    || (toDateTime1 >= reservationFromDate && fromDateTime1 <= reservationFromDate))
                    || (fromDateTime1 <= reservationToDate && toDateTime1 >= reservationToDate)){
                        reservations1.push(reservationsBasedOnReservationTyp[i]);
                }
            }
            if(!roomId){
                var map1 = {
                        'reservationsBasedOnReservationTyp': reservations1
                };
                return map1;
            }
            if(!reservationTypeId){
                var map2 = {
                    'reservationsBasedOnRoom': reservations
                };
                return map2;
            }
            if(!room && !reservationTyp){
                throw new NotFoundException(`room or reservationTyp not found`);
            }
    }

    async addReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
        return this.reservationRepository.addReservation(createReservationDto, this.placeRepository, this.customerRepository, this.roomRepository);
    }
    async changeReservationStatus(createReservationDto: CreateReservationDto, id: number): Promise<Reservation> {
        return this.reservationRepository.changeReservationStatus(createReservationDto, id);
    }
    async clientAddReservation(createClientReservationDto: CreateClientReservationDto): Promise<Reservation> {
        return this.reservationRepository.clientAddReservation(createClientReservationDto, this.placeRepository, this.customerRepository, this.reservationTypeRepository);
    }

    async getReservationById(id: number): Promise<Reservation> {
        const found = await this.reservationRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Reservation with ID ${id} not found`);
        }

        return found;
    }

    async deleteReservationById(id: number): Promise<boolean> {
        const found = await this.reservationRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Reservation with ID ${id} not found`);
        }

        this.reservationRepository.remove(found);
        return true;
    }

    async getReservationByPlaceId(placeId: number): Promise<Reservation[]> {
        const place = await this.placeRepository.findOne({where: {id: placeId}});
        if(!place){
            throw new NotFoundException(`Place ID: ${placeId} not found`);
        }
        else{
            const found = await this.reservationRepository.createQueryBuilder('Reservation').where({place: place})
                .leftJoinAndSelect('Reservation.place', 'place')
                .leftJoinAndSelect('Reservation.customer', 'customer')
                .leftJoinAndSelect('Reservation.room', 'room')
                .leftJoinAndSelect('customer.interests', 'interests')
                .getMany();

            if (!found) {
                throw new NotFoundException(`No Reservations found for place ID: ${placeId}`);
            }
    
            for(let i = 0 ; i < found.length; i++){
                delete found[i].customer.accessToken;
                delete found[i].customer.password;
                delete found[i].customer.salt;
            }
            return found;
        }
    }
 
    async getReservationByCustomerId(customerId: number): Promise<Reservation[]> {
        const customer = await this.customerRepository.findOne({where: {id: customerId}});
        if(!customer){
            throw new NotFoundException(`Customer ID: ${customerId} not found`);
        }
        else{
            const found = await this.reservationRepository.createQueryBuilder('Reservation').where({customer: customer}).leftJoinAndSelect('Reservation.place', 'place').leftJoinAndSelect('Reservation.customer', 'customer').getMany();

            if (!found) {
                throw new NotFoundException(`No Reservations found for place ID: ${customerId}`);
            }
    
            for(let i = 0 ; i < found.length; i++){
                delete found[i].customer.accessToken;
                delete found[i].customer.password;
                delete found[i].customer.salt;
            }
            return found;
        }
    }

    async getPlaceIncome(placeId: number, fromDate: string, toDate: string){
        const place = await this.placeRepository.findOne({where: {id: placeId}});
        if(!place){
            throw new NotFoundException(`Place ID: ${placeId} not found`);
        }

        // let reservationsBasedOnPlace1 = await this.reservationRepository.createQueryBuilder('Reservation')
        // .leftJoinAndSelect('Reservation.place', 'place')
        // .select("SUM(Reservation.price)", "total")
        // .where("Reservation.placeId = :placeId", {placeId: placeId})
        // // .where({fromDate: fromDate})
        // // .groupBy("place.id")
        // .getRawOne();
        // console.log(reservationsBasedOnPlace1)

        let fromDateTime = new Date(fromDate);
        let toDateTime = new Date(toDate);
        const daysDiff = Math.floor(Math.abs(<any>fromDateTime - <any>toDateTime) / (1000*60*60*24));
        let incomes = [];
        let remainings = new Map<string, number>();
        for(let i = 0; i <= daysDiff; i++){
            let total = 0;
            let date = `${fromDateTime.getFullYear()}-${fromDateTime.getMonth()+1 < 10 ? '0' : ''}${fromDateTime.getMonth() + 1}-${fromDateTime.getDate()}`;
            let reservationsInDay = await this.reservationRepository.createQueryBuilder('Reservation')
                .leftJoinAndSelect('Reservation.place', 'place')
                .leftJoinAndSelect('Reservation.room', 'room')
                .leftJoinAndSelect('room.reservationType', 'reservationType')
                .where("Reservation.placeId = :placeId", {placeId: placeId})
                .where({fromDate: date})
                .getMany();
            for(let i = 0; i < reservationsInDay.length; i++){
                if(remainings.has(reservationsInDay[i].fromDate)){
                    total += (reservationsInDay[i].price / reservationsInDay[i].numOfDays)
                     + remainings.get(reservationsInDay[i].fromDate);
                     remainings.delete(reservationsInDay[i].fromDate);
                }
                else{
                    total += reservationsInDay[i].price / reservationsInDay[i].numOfDays;
                }
            }
            for(let i = 0; i < reservationsInDay.length; i++){
                for(let j = 1; j <= reservationsInDay[i].numOfDays - 1; j++){
                    let date = new Date(reservationsInDay[i].fromDate);
                    let nextDate: Date = this.addDays(date, j);
                    if(remainings.has(this.formatDateToString(nextDate))){
                        let old = remainings.get(this.formatDateToString(nextDate));
                        old += reservationsInDay[i].price / reservationsInDay[i].numOfDays
                        remainings.set(this.formatDateToString(nextDate), old);
                    }
                    else{
                        remainings.set(this.formatDateToString(nextDate),
                        reservationsInDay[i].price / reservationsInDay[i].numOfDays);
                    }
                }
            }

            incomes = incomes.concat({"day": date, "total": total });

            fromDateTime.setDate(fromDateTime.getDate() + 1);
        }

        remainings.forEach((value: number, key: string) => {
            for(let i = 0; i < incomes.length; i++){
                if(incomes[i]['day'] == key){
                    incomes[i]['total'] += value;
                }
            }
        });

        return incomes;
    }

    async getreservationByInterests(placeId: number){
        const place = await this.placeRepository.findOne({where: {id: placeId}});
        if(!place){
            throw new NotFoundException(`Place ID: ${placeId} not found`);
        }
        else{
            const found = await this.reservationRepository.createQueryBuilder('Reservation')
                .where({place: place})
                .select("interests.name", "interestName")
                .addSelect("SUM(Reservation.price)", "total")
                .leftJoin('Reservation.customer', 'customer')
                .leftJoin('customer.interests', 'interests')
                .groupBy("interests.id")
                .getRawMany();

            if (!found) {
                throw new NotFoundException(`No Reservations found for place ID: ${placeId}`);
            }
            // return found;
            let total = 0;
            for (let index = 0; index < found.length; index++) {
                 total += +found[index].total;
                
            }

            var map1 = {
                'total': total,
                'sub': found
        };
            return map1;
        }
    }

    async getreservationByCities(placeId: number){
        const place = await this.placeRepository.findOne({where: {id: placeId}});
        if(!place){
            throw new NotFoundException(`Place ID: ${placeId} not found`);
        }
        else{
            const found = await this.reservationRepository.createQueryBuilder('Reservation')
                .where({place: place})
                .select("city.name", "cityName")
                .addSelect("city.id", "cityId")
                .addSelect("SUM(Reservation.price)", "total")
                .leftJoin('Reservation.customer', 'customer')
                .leftJoin('customer.cityId', 'city')
                .groupBy("city.id")
                .getRawMany();

            if (!found) {
                throw new NotFoundException(`No Reservations found for place ID: ${placeId}`);
            }
            return found;
        }
    }

    async getreservationByReservationsTypes(placeId: number){
        const place = await this.placeRepository.findOne({where: {id: placeId}});
        if(!place){
            throw new NotFoundException(`Place ID: ${placeId} not found`);
        }
        else{
            const found = await this.reservationRepository.createQueryBuilder('Reservation')
                .where({place: place})
                .select("reservationType.name", "reservationTypeName")
                .addSelect("SUM(Reservation.price)", "total")
                .leftJoin('Reservation.room', 'room')
                .leftJoin('room.reservationType', 'reservationType')
                .groupBy("reservationType.name")
                .getRawMany();

            if (!found) {
                throw new NotFoundException(`No Reservations found for place ID: ${placeId}`);
            }
            return found;
        }
    }

    async reservationByFilters(placeId: number, numOfKids: number, gender: Gender, status: Status,
        numOfKidsOpe: Operation){
        const place = await this.placeRepository.findOne({where: {id: placeId}});
        if(!place){
            throw new NotFoundException(`Place ID: ${placeId} not found`);
        }
        else{
            let found;
            if(gender == undefined && status == undefined && numOfKids == undefined){
            found = await this.reservationRepository.createQueryBuilder('Reservation')
                .leftJoinAndSelect('Reservation.place', 'place')
                .select("SUM(Reservation.price)", "total")
                .where("Reservation.placeId = :placeId", {placeId: placeId})
                .getRawOne();
            }

            else if(gender != undefined && status == undefined && numOfKids == undefined){
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                .leftJoin('Reservation.customer', 'customer')
                .select("customer.gender", "gender")
                .addSelect("SUM(Reservation.price)", "total")
                .where("Reservation.placeId = :placeId", {placeId: placeId})
                .andWhere(gender ? "customer.gender = :gender" : "1=1", {gender: gender})
                .addGroupBy("customer.gender")
                .getRawMany();
            }
            else if(gender == undefined && status != undefined && numOfKids == undefined){
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                .leftJoin('Reservation.customer', 'customer')
                .select("customer.status", "status")
                .addSelect("SUM(Reservation.price)", "total")
                .where("Reservation.placeId = :placeId", {placeId: placeId})
                .andWhere(status ? "customer.status = :status" : "1=1", {status: status})
                .addGroupBy("customer.status")
                .getRawMany();
            }
            else if(gender == undefined && status == undefined && numOfKids != undefined){
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                .leftJoin('Reservation.customer', 'customer')
                .select("customer.numOfKids", "numOfKids")
                .addSelect("SUM(Reservation.price)", "total")
                .where(this.getOperation(numOfKidsOpe), {numOfKids: numOfKids})
                .addGroupBy("customer.numOfKids")
                .getRawMany();
            }


            else if(gender != undefined && status != undefined && numOfKids == undefined){
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                .leftJoin('Reservation.customer', 'customer')
                .select("customer.status", "status")
                .addSelect("customer.gender", "gender")
                .addSelect("SUM(Reservation.price)", "total")
                .where("Reservation.placeId = :placeId", {placeId: placeId})
                .andWhere(status ? "customer.status = :status" : "1=1", {status: status})
                .andWhere(gender ? "customer.gender = :gender" : "1=1", {gender: gender})
                .groupBy("customer.gender")
                .addGroupBy("customer.status")
                .getRawMany();
            }
            else if(gender != undefined && status == undefined && numOfKids != undefined){
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                .leftJoin('Reservation.customer', 'customer')
                .select("customer.gender", "gender")
                .addSelect("customer.numOfKids", "numOfKids")
                .addSelect("SUM(Reservation.price)", "total")
                .where("Reservation.placeId = :placeId", {placeId: placeId})
                .andWhere(gender ? "customer.gender = :gender" : "1=1", {gender: gender})
                .andWhere(this.getOperation(numOfKidsOpe), {numOfKids: numOfKids})
                .groupBy("customer.gender")
                .addGroupBy("customer.numOfKids")
                .getRawMany();
            }
            else if(gender == undefined && status != undefined && numOfKids != undefined){
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                .leftJoin('Reservation.customer', 'customer')
                .select("customer.status", "status")
                .addSelect("customer.numOfKids", "numOfKids")
                .addSelect("SUM(Reservation.price)", "total")
                .where("Reservation.placeId = :placeId", {placeId: placeId})
                .andWhere(status ? "customer.status = :status" : "1=1", {status: status})
                .andWhere(this.getOperation(numOfKidsOpe), {numOfKids: numOfKids})
                .groupBy("customer.status")
                .addGroupBy("customer.numOfKids")
                .getRawMany();
            }

            else if(gender != undefined && status != undefined && numOfKids != undefined){
                found = await this.reservationRepository.createQueryBuilder('Reservation')
                .leftJoin('Reservation.customer', 'customer')
                .select("customer.status", "status")
                .addSelect("customer.gender", "gender")
                .addSelect("customer.numOfKids", "numOfKids")
                .addSelect("SUM(Reservation.price)", "total")
                .where("Reservation.placeId = :placeId", {placeId: placeId})
                .andWhere(status ? "customer.status = :status" : "1=1", {status: status})
                .andWhere(gender ? "customer.gender = :gender" : "1=1", {gender: gender})
                .andWhere(this.getOperation(numOfKidsOpe), {numOfKids: numOfKids})
                .groupBy("customer.gender")
                .addGroupBy("customer.status")
                .addGroupBy("customer.numOfKids")
                .getRawMany();
            }
            



            if (!found) {
                throw new NotFoundException(`No Reservations found for place ID: ${placeId}`);
            }

            return found;
        }
    }

    addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }

    formatDateToString(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth()+1 < 10 ? '0' : ''}${date.getMonth()+1}-${date.getDate()}`;
    }

    getOperation(numOfKidsOpe: Operation) { 
        try{
        if(!Object.values(Operation).includes(numOfKidsOpe)){
            throw new ForbiddenException(`operation must be {BIGGER, BIGGER_OR_EQUALS, EQUALS, SMALLER_OR_EQUALS, SMALLER}`)
        }
        if(numOfKidsOpe == Operation.BIGGER)
            return "customer.numOfKids > :numOfKids";
        else if(numOfKidsOpe == Operation.BIGGER_OR_EQUALS)
            return "customer.numOfKids >= :numOfKids";
        else if(numOfKidsOpe == Operation.EQUALS)
            return "customer.numOfKids = :numOfKids";
        else if(numOfKidsOpe == Operation.SMALLER_OR_EQUALS)
            return "customer.numOfKids <= :numOfKids";
        else if(numOfKidsOpe == Operation.SMALLER)
            return "customer.numOfKids > :numOfKids";
        }
        catch(e){
            throw new ForbiddenException(`operation must be {BIGGER, BIGGER_OR_EQUALS, EQUALS, SMALLER_OR_EQUALS, SMALLER}`)
        }
    }
}
