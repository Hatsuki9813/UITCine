import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import SuatChieuContainer from '../../components/SuatChieu/SuatChieuContainer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function LichChieu() {
   const Selectiondata = [
    {label: 'Option 1', value: '1' },
    {label: 'Option 2', value: '2' },
    {label: 'Option 3', value: '3' },
    {label: 'Option 4', value: '4' },
  ];
  
   const timeData = [
    "07:00", "13:00", "14:00", "15:00", "09:00", "23:00"
  ];
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]); // Danh sách ID ghế đã được chọn

  const seatPrice = 50000;
  const totalPrice = selectedSeats.length * seatPrice; 
  const initialBookedSeats = [2, 4, 6];

  // Dùng useEffect để cập nhật giá trị bookedSeats
  useEffect(() => {
    setBookedSeats(initialBookedSeats);
  }, []);
  // Tạo danh sách ghế (giả sử có 40 ghế)
  const seats = Array.from({ length: 42 }, (_, i) => ({
    id: i + 1,
    isSelected: false,
  }));

  // Xử lý khi người dùng chọn ghế
  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((id) => id !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  return (
    <ScrollView>
    <View style={styles.Container}>
      <View style={styles.ChonrapContainer}>
        <Text style={styles.Header}>Chọn rạp</Text>
        <View style={styles.Dropdowncontainer}>
          <Dropdown
            style={styles.dropdown}
            data={Selectiondata}
            labelField="label"
            valueField="value"
            placeholder="Tỉnh thành"
            value={selectedProvince}
            onChange={(item) => {
              setSelectedProvince(item.value);
            }}
          />
          <Dropdown
            style={styles.dropdown}
            data={Selectiondata}
            labelField="label"
            valueField="value"
            placeholder="Rạp"
            value={selectedCinema}
            onChange={(item) => {
              setSelectedCinema(item.value);
            }}
          />
          <Dropdown
            style={styles.dropdown}
            data={Selectiondata}
            labelField="label"
            valueField="value"
            placeholder="Ngày"
            value={selectedDate}
            onChange={(item) => {
              setSelectedDate(item.value);
            }}
          />
        </View>
      </View>

      <View style={styles.ChonSuatChieuContainer}>
        <Text style={styles.Header}>Chọn suất chiếu</Text>
        <FlatList
          data={timeData}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => <SuatChieuContainer time={item} />}
          scrollEnabled={false}
          contentContainerStyle={styles.SuatChieuFlatlist}
        />
      </View>

      <View style={styles.ChonGheContainer}>
        <Text style={styles.Header}>Chọn ghế</Text>
        
        <View style={styles.ManHinh}>
          <Text style={styles.ManHinhText}>Màn hình</Text>
        </View>
        <FlatList
  data={seats}
  keyExtractor={(item) => item.id.toString()}
  numColumns={6}
  scrollEnabled={false}
  renderItem={({ item }) => {
    const isBooked = bookedSeats.includes(item.id); // Kiểm tra ghế đã được chọn trước đó
    const isSelected = selectedSeats.includes(item.id); // Kiểm tra ghế được chọn tạm thời
    return (
      <TouchableOpacity
        style={[
          styles.seat,
          isBooked
            ? styles.bookedSeat // Style cho ghế đã được chọn
            : isSelected
            ? styles.selectedSeat // Style cho ghế được chọn tạm thời
            : null,
        ]}
        disabled={isBooked} // Không thể nhấn vào ghế đã được chọn
        onPress={() => toggleSeatSelection(item.id)}
      >
        <MaterialIcons
          name="event-seat"
          size={30}
          color={isBooked ? 'red' : isSelected ? '#433878' : 'gray'}
        />
      </TouchableOpacity>
    );
  }}
/>
        <Text style={styles.selectedSeatText}>
            Ghế đã chọn: {selectedSeats.join(', ') || 'None'}
          </Text>
        </View>
      </View>
      <View style={styles.TotalSeatAndPrice}>
        <View style={styles.TotalSeatAndPriceText}> 
          
          <Text style={styles.PriceText}>
            Giá tiền: 
          </Text>
          <Text style={styles.PriceText}>
            {totalPrice.toLocaleString()} VNĐ
          </Text>

        </View>
        <TouchableOpacity style={styles.ThanhToanButton}>
          <Text style={styles.ThanhToanText}>Thanh toán</Text>
        </TouchableOpacity>
        </View>
       
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
  },
  ChonrapContainer: {
    marginTop: 20,
    flex: 1,
    marginBottom: 20, 
  },
  ChonSuatChieuContainer: {
    marginTop: 20,
    flex: 1,
    marginBottom: 20, 


  },
  Dropdowncontainer: {
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dropdown: {
    marginBottom: 20,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: 200
  },
  selected: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  Header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#9747FF',
    marginBottom: 10,
    textAlign: 'left', // Căn trái
    alignSelf: 'flex-start', // Đảm bảo header nằm về bên trái
    marginLeft: 10,
    
  },
  SuatChieuFlatlist: {
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center',
  },
  seat: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSeat: {
    borderColor: '#433878'
  },
  selectedSeatsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Tùy chỉnh khoảng cách giữa các ghế
    padding: 10,
  },
  ManHinh: {
    width: '80%',
    backgroundColor: '#9747FF',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  ManHinhText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',

  },
  ChonGheContainer: {
      flex: 1,
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
    marginBottom: 20, 

  },

  TotalSeatAndPrice: {
    backgroundColor: '#433878',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }, 
  PriceText : {
    color: '#FCC434',
    fontSize: 25,
    fontWeight: 'bold',
  },
  ThanhToanButton: {
    backgroundColor: '#FFD700', // Màu nền nút
    paddingVertical: 15, // Khoảng cách dọc bên trong nút
    paddingHorizontal: 30, // Khoảng cách ngang bên trong nút
    borderRadius: 20, // Bo góc nút
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', 
    marginTop: 10, 
    flex:2

  },
  TotalSeatAndPriceText: {
    flex:3
  },
  selectedSeatText: {
    fontSize: 14,
    color: 'black',
  }, 
  ThanhToanText: {
    fontSize: 20,
    color: 'black',
    textAlign: "center",
    fontWeight: 'bold',
  }
})