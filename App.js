import { TouchableOpacity, TextInput, Text, StyleSheet, FlatList, View } from 'react-native'
import React, {useState } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native';

const App = () => {
  const[search,setSearch]=useState('');

  const [reg_no, setReg_No] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stdclass, setStd_class] = useState('');
  const [gpa, setGpa] = useState('');

  const[StudentData,setStdData]=useState([]);
  const[searchData,setSearchData]=useState([]);
  const[SortData,setSortData]=useState([]);

  const[visible,setVisible]=useState(false);
  const [visible1, setVisible1] = useState(false);


  const StdAdd=()=>{
    if(reg_no.length && name.length && email.length && gpa.length>0){

      setStdData([...StudentData,{Key:new Date().getTime(), Registration_No:reg_no,Name:name,Email:email,Class:stdclass,CGPA:gpa }]);

      setReg_No('');
      setName('');
      setEmail('');
      setStd_class('');
      setGpa('');
      console.log(StudentData.length);
    }else{
      console.info("Please Fill all the Input Feilds")
    }
  }
  const DeleteItem = (Key) => {
    const FilterData = StudentData.filter(element => element.Key !== Key)
    setStdData(FilterData);
   


  }


  const handleUpdateStudent = () => {
    const updatedStudents = [...StudentData];
    const index = StudentData.findIndex(student => student.Registration_No === reg_no);
    if (index !== -1) {
      updatedStudents[index] = { Registration_No:reg_no, Name:name, Email:email, Class:stdclass, CGPA:gpa };
      setStdData(updatedStudents);
      setReg_No('');
      setName('');
      setEmail('');
      setStd_class('');
      setGpa('');
    }
  };

  









  const SortFn=()=>{
    setVisible(!visible);
    const sortData=StudentData.filter((item)=>{
      return item.Registration_No%2==0;
    })
    setSortData(sortData);
    
  }

const SearchFn=()=>{

  const FilterSearch=StudentData.filter((item)=>item.Registration_No==search)
  setSearchData(FilterSearch);
  setSearch('');

}

  const renderItemserch = ({ item }) => (
    <View style={{ marginTop: 5, marginLeft: 10 }}>
      <Text>Reg_No    Name      Email            Class     CGPA</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginTop: 10, marginRight: 10 }}>{item.Registration_No}      {item.Name}   {item.Email}      {item.Class}     {item.CGPA}</Text>
      
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={{ marginTop: 5, marginLeft: 10}}>
      <Text>Reg_No    Name      Email            Class     CGPA</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginTop: 10, marginRight: 10 }}>{item.Registration_No}      {item.Name}   {item.Email}      {item.Class}     {item.CGPA}</Text>
        <TouchableOpacity style={{
          backgroundColor: 'deepskyblue', 
         borderRadius:10, 
          width: 60, height: 30, justifyContent: 'center', alignItems: 'center'
        }}
          onPress={() => DeleteItem(item.Key)}
        >
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}> Delete</Text></TouchableOpacity>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={styles.container }>
      <StatusBar barStyle="dark-content" hidden={false}
        backgroundColor="white" translucent={true} />
      <View style={{ backgroundColor:'deepskyblue',height:80,borderBottomRightRadius:100, flexDirection:'column',marginTop:60,justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Student Record Management System</Text>
        <Text style={{ marginTop:5,fontSize: 14, fontWeight: 'bold', color: 'black' }}>Saqlain Ali Shah (Fa20-bcs-079)</Text>
      </View>
     <View style={{flexDirection:'column'}}>
        <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', marginLeft: 10 }}>
          <TextInputFeild MaxLength={3} pholder={'Search by Registration No'} value={search} onchange={(text) => setSearch(text)}></TextInputFeild>
          <MyButton OnPressFn={SearchFn} Title={'Search'} BtnWidth={70}></MyButton>
        </View>
        <View>
            <FlatList data={searchData} renderItem={renderItemserch}></FlatList>
        </View>
     </View>
      <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',}}>
        <Text style={{marginBottom:10,fontSize:15,fontWeight:'bold'}}>Student Registration</Text>
        <TextInputFeild MaxLength={3} pholder={'Registration No'} value={reg_no} onchange={(text) => setReg_No(text)}></TextInputFeild>
        <TextInputFeild MaxLength={8} pholder={'Name'} value={name} onchange={(text) => setName(text)}></TextInputFeild>
        <TextInputFeild MaxLength={10} pholder={'Email'} value={email} onchange={(text) => setEmail(text)}></TextInputFeild>
        <TextInputFeild MaxLength={5} pholder={'Class'} value={stdclass} onchange={(text) => setStd_class(text)}></TextInputFeild>
        <TextInputFeild MaxLength={4} pholder={'CGPA'} value={gpa} onchange={(text) => setGpa(text)}></TextInputFeild>
      </View>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <View style={{marginLeft:5}}>
          <MyButton OnPressFn={StdAdd} Title={'Add'} BtnWidth={90}></MyButton>
        </View>
        <View style={{ marginLeft: 10 }}>
          <MyButton OnPressFn={handleUpdateStudent} Title={'Update'} BtnWidth={90}></MyButton>
        </View>
        <View style={{ marginLeft: 10 }}>
          <MyButton OnPressFn={SortFn} Title={'Sort Even IDs'} BtnWidth={130}></MyButton>
        </View>
      </View>
      <View>
        {visible? (
          <FlatList data={SortData}
            renderItem={renderItem}
          ></FlatList>
        ) : <FlatList data={StudentData}
          renderItem={renderItem}
        ></FlatList>}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})

export default App;


const TextInputFeild = ({ pholder, value, onchange,MaxLength}) => {
  return (
    <View>
      <TextInput
        style={{
          marginBottom:8,
          fontSize: 18, 
          borderRadius: 10, 
          borderWidth: 1,
          height: 50, 
          width:300,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 10},
          shadowOpacity: 0.53,
          shadowRadius: 13.97,
           marginRight:5,
          paddingLeft: 20
        }}
        value={value}
        onChangeText={onchange}
        placeholder={pholder} 
        placeholderTextColor={'black'}
        maxLength={MaxLength}
      ></TextInput>
    </View>

  );
}


const MyButton = ({ OnPressFn, Title,BtnWidth }) => {
  return (
    <TouchableOpacity style={{
    
      backgroundColor: 'deepskyblue',
      borderRadius: 10,
      shadowColor:'black',
      shadowOpacity:0.4,
      shadowRadius:10,
      height: 50,
      width: BtnWidth,
      justifyContent: 'center',
       alignItems: 'center'
    }}
      onPress={OnPressFn}>
      <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}> {Title}</Text>
    </TouchableOpacity>
  )
}