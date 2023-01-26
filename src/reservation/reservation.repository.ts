import { ConflictException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CustomerRepository } from "src/customers/customer.repository";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { PlaceType } from "src/places/dto/create-place-dto";
import { PlaceRepository } from "src/places/place.repository";
import { PriceType } from "src/reservationـtype/dto/create-reservation-type-dto";
import { ReservationTypeRepository } from "src/reservationـtype/reservation.type.repository";
import { Room } from "src/rooms/room.entity";
import { RoomRepository } from "src/rooms/room.repository";
import { Repository } from "typeorm";
import { CreateClientReservationDto } from "./dto/create-client-reservation-dto";
import { CreateReservationDto } from "./dto/create-reservation-dto";
import { Reservation } from "./reservation.entity";

@CustomRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {
    async addReservation(createReservationDto: CreateReservationDto, placeRepository: PlaceRepository, customerRepository: CustomerRepository, roomRepository: RoomRepository): Promise<Reservation> {
        const { type, status, fromDate, toDate, customerId, placeId, roomId } = createReservationDto;
        
        const reservation = new Reservation();
        const place = await placeRepository.findOne({ where: { id: placeId } });
        if (status) {
            reservation.status = status;
        }
        if (place) {
            reservation.place = place;
        }
        else {
            throw new NotFoundException("Place Id not found");
        }

        if(place.isMembership == true){
            const customer = await customerRepository.findOne({ where: { id: customerId } });
            if (customer) {
                reservation.customer = customer;
            }
            else {
                throw new NotFoundException("Customer Id not found");
            }
    
            const room = await roomRepository.createQueryBuilder('Room')
            .leftJoinAndSelect('Room.reservationType', 'reservationType')
            .where("Room.id = :roomId", {roomId})
            .getOne();
            if (room) {
                if(room.reservationType.placeId == placeId){
                    const reservations = await this.createQueryBuilder('Reservation').where({room: room}).getMany();
                    let fromDateTime = new Date(fromDate);
                    let toDateTime = new Date(toDate);
                    for(let i = 0; i < reservations.length; i++){
                        let reservationFromDate = new Date(reservations[i].fromDate);
                        let reservationToDate = new Date(reservations[i].toDate);
                        if((reservationFromDate <= fromDateTime && reservationToDate >= toDateTime) 
                            || (reservationFromDate >= fromDateTime && reservationFromDate <= toDateTime)
                            || (reservationToDate >= fromDateTime && reservationToDate <= toDateTime)){
                            throw new ForbiddenException(`There is a reservation with ID ${reservations[i].id} in this dates between ${reservations[i].fromDate} and ${reservations[i].toDate}`);
                        }
                    }
                    reservation.room = room;
                }
                else{
                    throw new ForbiddenException(`Room ID ${roomId} is not for Place ID ${placeId}`);
                }
            }
            else {
                throw new NotFoundException("Room Id not found");
            }
    
    
            if(Object.values(PlaceType).includes(type)){
                reservation.placeType = type;
            }
            else{
                throw new ForbiddenException('Place type should be {RESTURANT, HOTEL, SITE}');
            }
    
    
            if(room.reservationType.priceType == PriceType.PERNIGHT){
                var endDate = new Date(toDate);
                var startDate = new Date(fromDate);
                var days = (endDate.getDay() - startDate.getDay());
                reservation.price = room.reservationType.price * days;
                if(reservation.price < -1) {
                    reservation.price *= -1;
                }
            }
            else{
                var endDate = new Date(toDate);
                var startDate = new Date(fromDate);
                var hours = (endDate.getHours() - startDate.getHours());
                reservation.price = room.reservationType.price * hours;
            }
    
            let parsedFromDate = new Date(fromDate);
            let parsedtoDate = new Date(toDate);
            console.log(parsedFromDate);
            reservation.fromDate = `${parsedFromDate.getFullYear()}-${parsedFromDate.getMonth()+1 < 10 ? '0' : ''}${parsedFromDate.getMonth() + 1}-${parsedFromDate.getDate() + 1}-12`;
            reservation.toDate = `${parsedtoDate.getFullYear()}-${parsedtoDate.getMonth()+1 < 10 ? '0' : ''}${parsedtoDate.getMonth() + 1}-${parsedtoDate.getDate()}-12`;
            await this.save(reservation);
    
            delete reservation.customer.accessToken;
            delete reservation.customer.password;
            delete reservation.customer.salt;
            return reservation;
        }
        else {
            throw new ForbiddenException("Place is not a membership");
        }

        
    }

    async changeReservationStatus(createReservationDto: CreateReservationDto, id:number): Promise<Reservation> {
        const { type, status, fromDate, toDate, customerId, placeId, roomId } = createReservationDto;
        
        const reservation = await this.findOne({ where: { id: id } });
        reservation.status = status;

        this.createQueryBuilder()
            .update(reservation)
            .execute();
        return reservation;
        
    }


    async clientAddReservation(createClientReservationDto: CreateClientReservationDto, placeRepository: PlaceRepository, customerRepository: CustomerRepository, reservationTypeRepository: ReservationTypeRepository): Promise<Reservation> {
        const { type, fromDate, toDate, customerId, placeId, reservationTypeId } = createClientReservationDto;
        
        const reservation = new Reservation();
        const place = await placeRepository.findOne({ where: { id: placeId } });
        
        if (place) {
            reservation.place = place;
        }
        else {
            throw new NotFoundException("Place Id not found");
        }

        if(place.isMembership == true){
            const customer = await customerRepository.findOne({ where: { id: customerId } });
            if (customer) {
                reservation.customer = customer;
            }
            else {
                throw new NotFoundException("Customer Id not found");
            }

            const reservationType = await reservationTypeRepository.createQueryBuilder('ReservationType')
                .leftJoinAndSelect('ReservationType.rooms', 'rooms')
                .where("ReservationType.id = :reservationTypeId", {reservationTypeId})
                .getOne();
            if(!reservationType){
                throw new NotFoundException(`Reservation Type ID: ${reservationTypeId} not found`);
            }

            
            if(reservationType.placeId != placeId){
                throw new ForbiddenException(`Reservation Type ID ${reservationTypeId} is not for Place ID ${placeId}`);
            }

            let foundRoom: Room;
            let breaked: boolean = false;
            loop1: for(let i = 0; i < reservationType.rooms.length; i++){
                const reservations = await this.createQueryBuilder('Reservation').where({room: reservationType.rooms[i]}).getMany();
                    let fromDateTime = new Date(fromDate);
                    let toDateTime = new Date(toDate);
                    if(reservations.length > 0){
                        loop2 :for(let i = 0; i < reservations.length; i++){
                            let reservationFromDate = new Date(reservations[i].fromDate);
                            let reservationToDate = new Date(reservations[i].toDate);
                            if((reservationFromDate <= fromDateTime && reservationToDate >= toDateTime) 
                                || (reservationFromDate >= fromDateTime && reservationFromDate <= toDateTime)
                                || (reservationToDate >= fromDateTime && reservationToDate <= toDateTime)){
                                    breaked = true;
                                    break loop2;
                            }
                            else{
                                breaked = false;
                            }
                        }
                        if(!breaked){
                            reservation.room = reservationType.rooms[i];
                            foundRoom = reservationType.rooms[i];
                            break loop1;
                        }
                    }
                    else{
                        reservation.room = reservationType.rooms[i];
                        foundRoom = reservationType.rooms[i];
                        break loop1;
                    }
                
            }

            if(foundRoom === undefined){
                throw new ForbiddenException(`There is no available reservation in these date`);
            }

            
    
            if(Object.values(PlaceType).includes(type)){
                reservation.placeType = type;
            }
            else{
                throw new ForbiddenException('Place type should be {RESTURANT, HOTEL, SITE}');
            }
    
    
            if(reservationType.priceType == PriceType.PERNIGHT){
                var endDate = new Date(toDate);
                var startDate = new Date(fromDate);
                var days = (endDate.getDay() - startDate.getDay());
                reservation.price = reservationType.price * days;
                reservation.usdPrice = reservationType.usdPrice * days;
                if(reservation.price <= -1) {
                    reservation.price *= -1;
                }
                if(reservation.usdPrice <= -1) {
                    reservation.usdPrice *= -1;
                }
            }
            else{
                var endDate = new Date(toDate);
                var startDate = new Date(fromDate);
                var hours = (endDate.getHours() - startDate.getHours());
                reservation.price = reservationType.price * hours;
            }
    
            reservation.fromDate = fromDate;
            reservation.toDate = toDate;
            await this.save(reservation);
    
            delete reservation.place.reservations;
            delete reservation.customer.accessToken;
            delete reservation.customer.password;
            delete reservation.customer.salt;
            return reservation;
        }
        else {
            throw new ForbiddenException("Place is not a membership");
        }

        
    }
}