import { BaseForm } from "./Form";
import { Input,Textarea } from "./Form/InputGroup";
import { useProfile,useStoreActions } from "@/app/lib/zustand/store";
import { ResumeProfile} from "@/app/lib/zustand/types";

export const ProfileForm=() => {
    const profile =useProfile();
    const {changeProfile} =useStoreActions();
    const {name,email,phone,url,objective,location} = profile;

    const handleProfileChange=(field: keyof ResumeProfile, value: string) => {
        changeProfile({field, value});
    };

    return(
        <BaseForm>
         <div className="grid grid-cols-6 gap-3">
            <Input
              label="Name"
              labelClassName="col-span-full"
              name="name"
              placeholder="Neha K"
              value={name}
              onChange={handleProfileChange}
              />
              <Textarea
                 label="Objective"
                 labelClassName="col-span-full"
                 name="objective"
                 placeholder="Entrepreneur and educator obsessed with making education free for anyone"
                 value={objective}
                 onChange={handleProfileChange}
                 />
               <Input
                 label="Email"
                 labelClassName="col-span-4"
                 name="email"
                 placeholder="hello@abcacademy.org"
                 value={email}
                 onChange={handleProfileChange}
                />  
                <Input
                  label="Phone"
                  labelClassName="col-span-2"
                  name="phone"
                  placeholder="91-9876543"
                  value={phone}
                  onChange={handleProfileChange}
        />
                <Input
                  label="Website"
                  labelClassName="col-span-4"
                  name="url"
                  placeholder="linkedin.com/in/abcacademy"
                  value={url}
                  onChange={handleProfileChange}
                  />
                <Input
                  label="Location"
                  labelClassName="col-span-2"
                  name="location"
                  placeholder="Bangalore"
                  value={location}
                  onChange={handleProfileChange}
                  />  
         </div>  
        </BaseForm>
    );   
};