import React, { useState, useEffect } from 'react';
import useFetch from '../../useFetch';
import PostDetail from '../common/PostDetail';
import { Drawer, List, ListItem, ListItemText, CssBaseline , styled, Button} from '@mui/material';
import ImageButton from '../common/imagebutton'
import CheckboxMenu from '../common/checkbox'
import { setLoading, showError } from '../../App';
import axios from 'axios';



const MyDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
});

const Content = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const MyComponent = () => {
    const options = ['Location', 'budget'];
    const options2 = ['Physical', 'Online'];
    
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItems2, setSelectedItems2] = useState([]);

    const [Fav_location,setPreferredLocations]=useState([])
    const [filteredPosts, setFilteredPosts] = useState([]);

  
    const { data: posts, isPending, error } = useFetch('http://localhost:5000/api/post');

    const [open, setOpen] = useState(true);

    const toggleDrawer = (isOpen) => () => {
      setOpen(isOpen);
    };

    const fetchLocations=async()=>{
      setLoading(true)
      var url=`http://localhost:5000/api/location`
      var res= await axios.get(url)
      if(res.data.success){
        console.log('success data')
          setPreferredLocations(res.data.data)
          
      }else{
        showError('failed to fetch data')
      }
      setLoading(false)
    }

  useEffect( () =>{
    fetchLocations()
  }, [])

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(posts)) {
    return <div>No posts found.</div>;
  }

  const applyFilter = () => {
    console.log(selectedItems);
    console.log(selectedItems2);
  };



  const resetFilter = () => {
    setSelectedItems([])
    setSelectedItems2([])
    setFilteredPosts([])
  };

  
  return (

    <div>
    {isPending ? (
      <div>Loading...</div>
    ) : error ? (
      <div>Error: {error}</div>
    ) : posts === null || posts.length === 0 ? (
      <div>No posts found.</div>
    ) : (
      <div style={{ display: 'flex' }}>
      <CssBaseline />
      <MyDrawer variant="permanent" anchor="left">
        <div style={{ marginTop: 64 }} /> {/* Adjust margin based on your content */}
        <ImageButton favLocations={Fav_location} posts={posts} setFilteredPosts={setFilteredPosts} filteredPosts={filteredPosts}/>
        <p>Filter</p>
        <CheckboxMenu options={options} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
        <p>Platform</p>
        <CheckboxMenu options={options2} selectedItems={selectedItems2} setSelectedItems={setSelectedItems2} />
        <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={applyFilter}>Apply</Button>
        <Button onClick={resetFilter}>Reset</Button>
        </div>
      </MyDrawer>
      <Content>
        
        <div style={{ marginTop: 64 }}> {/* Adjust margin based on your content */}
            
                {filteredPosts && filteredPosts.length > 0 &&(
                    filteredPosts.map((post) => (
                      <div>
                         <PostDetail key={post.id} post={post} filtered={true}/>
                         
                        </div>
                  ))
                )}
                {filteredPosts && filteredPosts.length === 0 &&(
                    posts.map((post) => (
                      <PostDetail key={post.id} post={post} filtered={false}/>
                  ))
                )}

        </div>
      </Content>
    </div>
    )}
     </div>
    
  );
}

export default MyComponent;
