import React, { useState } from 'react';
import axios from 'axios';
import { uploadImageToFirebase } from '@/lib/firebaseUtils';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, PlusIcon } from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';

const CreatePosts = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [relatedImages, setRelatedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imgup, setImgUp] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Data types for selection
  const dataTypes = [
    { value: 'bb-s', label: 'Baby Shooting' },
    { value: 'pg-s', label: 'Pregnant Shooting' },
    { value: 'sc-s', label: 'Smash Cake' },
  ];

  // State for selected dataType
  const [selectedDataType, setSelectedDataType] = useState(dataTypes[0].value);

  const handleImageUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgUp(true)
    try {
      const url = await uploadImageToFirebase(file, setUploadProgress);
      callback(url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Image upload error:', error);
      setImgUp(false) 
    } finally {
      setUploadProgress(0);
      setImgUp(false) 
    }
  };

  const handleAddRelatedImage = () => {
    setRelatedImages((prev) => [...prev, '']); // Placeholder for new image
  };

  const handleRemoveRelatedImage = (index) => {
    setRelatedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    if (!title || !price || !image) {
      toast.error('Please fill all required fields');
      return;
    }

    const payload = {
      title,
      price,
      image,
      relatedImages: relatedImages.filter((img) => img), // Remove empty entries
      dataType: selectedDataType, // Use the selected data type
    };

    try {
      const response = await axiosInstance.post('/products/create', payload);

      if (response.status === 201) {
        toast.success('Product created successfully');
        setTitle('');
        setPrice('');
        setImage('');
        setRelatedImages([]);
        window.location.reload();
      } else {
        toast.error('Failed to create product');
      }
    } catch (error) {
      toast.error('An error occurred while creating the product');
      console.error('Publish error:', error);
    }
  };

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button size="sm">Create Model</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[400px] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" /> Create New Model
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={imgup}/>
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="price">Price</Label>
            <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} disabled={imgup}/>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="mainImage">Main Picture</Label>
            <Input
              id="mainImage"
              type="file"
              onChange={(e) => handleImageUpload(e, setImage)}
              disabled={imgup}
            />
            {uploading && <p>Uploading: {uploadProgress}%</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Related Images</Label>
            {relatedImages.map((img, index) => (
              <div key={index} className="flex items-center gap-4">
                <Input
                  type="file"
                  disabled={imgup}
                  onChange={(e) => handleImageUpload(e, (url) => {
                    setRelatedImages((prev) => {
                      const updatedImages = [...prev];
                      updatedImages[index] = url;
                      return updatedImages;
                    });
                  })}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRemoveRelatedImage(index)}
                  disabled={imgup}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={handleAddRelatedImage} disabled={imgup}>
              <PlusCircle className="h-5 w-5" />
            </Button>
          </div>

          {/* Data Type Select Dropdown */}
          <div className="flex items-center gap-4">
            <Label htmlFor="dataType">Data Type</Label>
            <select
              id="dataType"
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value)}
              disabled={imgup}
              className="p-2 border rounded"
            >
              {dataTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={handlePublish} disabled={imgup}>
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePosts;
