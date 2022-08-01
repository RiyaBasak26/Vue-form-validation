<template>
    <div>
        <form class="new-friends-form" @submit.prevent="login">
            <div>
            <div class="fielt">
                <label for="name">Name:</label>
                <input type="text" v-model="name">
            </div>
            </div>
            <div>
            <div class="fielt">
                <label for="contactNumber">Phone Number:</label>
                <input type="tel" v-model="phone" @change="phoneNumberCheck">
            </div>
            <span class="errortooltip" v-if="errormsg.phoneerr">
                {{ errormsg.phoneerr }}
            </span>
            </div>
            <div>
            <div class="fielt">
                <label for="password">Password</label>
                <input v-bind:type="[showPassword ? 'text' : 'password']" @change="passwordCheck" v-model="password">
                <span class="icon" @click="showPassword = !showPassword">
                    <img class="fa" :src="[showPassword ?   'assets/eye_open.png':'assets/eye_close.png']">
                </span>
            </div>
            
            <span class="errortooltip" v-if="errormsg.passworderr">
                {{ errormsg.passworderr }}
            </span>
            </div>
            <div>
            <div class="fielt">
                <label for="confirm password">Confirm Password</label>
                <input type="password" @change="confirmPasswordCheck" v-model="confirmPassword">
            </div>
            <span class="errortooltip" v-if="errormsg.confirmPassworderr">
                {{ errormsg.confirmPassworderr }}
            </span>
            </div>
            <div>
            <div class="fielt">
                <label for="email">Email:</label>
                <input type="email" @change="onChange" v-model="email">
            </div>
            <span class="errortooltip" v-if="errormsg.emailerr">
                {{ errormsg.emailerr }}
            </span>
            </div>
            <div><button type="submit" v-on:click="onSubmitHandler" id="myBtn" :disabled="!isEnable">Sign Up</button>
            </div>
        </form>
    </div>
</template>
<script>
// import { watch } from "fs";
import { ref ,computed} from "vue";
export default {
    name: "friend-details-form",
    props: [
        "on-submit"
    ],
    setup(props) {
        let name = ref("");
        let showPassword = ref(false);
        let phone = ref("");
        let password = ref("");
        let email = ref("");
        let confirmPassword = ref("");
        let errormsg = ref({
            emailerr: "",
            passworderr: "",
            phoneerr: "",
            confirmPassworderr: ""
        })
        /**
         * @description Computed property to maintain the disable state of the sign up button
         */
        const isEnable = computed(() => {
            return (
                name.value.trim().length && phone.value.trim().length && password.value.trim().length && email.value.trim().length
            )
        });

        /*------------Methods---------*/
        /*----------validation check --------*/
        const confirmPasswordCheck = () => {
            if (password.value == confirmPassword.value)
                errormsg.value.confirmPassworderr = '';
            else
                errormsg.value.confirmPassworderr = 'Please match the password'

        }
        const phoneNumberCheck = () => {
            if ((/[0-9]{10}/).test(phone.value)) {
                errormsg.value.phoneerr = '';
            }
            else {
                errormsg.value.phoneerr = 'This field must be a valid Phone Number';
            }

        }
        const passwordCheck = () => {
            if ((/[a-zA-Z\d]{8}/).test(password.value))
                errormsg.value.passworderr = '';
            else
                errormsg.value.passworderr = 'Your password must be of atleast 8 chacters, one lowercase letter and one uppercase letter ';
        }
        const onChange = () => {
            let re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
            if (!re.test(email.value)) {
                errormsg.value.emailerr = 'This field must be a valid email';
            } else {
                errormsg.value.emailerr = '';
            }
        }

        const onSubmitHandler = () => {
            const formData = {
                name: name.value,
                phone: phone.value,
                email: email.value,
                password: password.value
            }

            props.onSubmit(formData);
            resetValues()
        }

        const resetValues = () => {
            name.value = '';
            phone.value = '';
            email.value = '';
            password.value = '';
            confirmPassword.value = '';
        }

        /*------------Methods---------*/

        return {
            name,
            phone,
            password,
            email,
            isEnable,
            errormsg,
            confirmPassword,
            showPassword,
            phoneNumberCheck,
            passwordCheck,
            onChange,
            onSubmitHandler,
            confirmPasswordCheck

        }
    }

}
</script>
<style scoped>
.new-friends-form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.fielt {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0;
}

.new-friends-form div input {
    border: none;
    border-bottom: 1px solid #000;
    line-height: 20px;
}

.new-friends-form div input:focus {
    outline: none;
    border-bottom: 2px solid #000;
}

.new-friends-form :last-child {
    justify-content: center;
}

.new-friends-form :last-child button {
    border-radius: 4px;
}

#myBtn:disabled {
    cursor: not-allowed;
    opacity: 0.8;
    background-color: rgb(67, 71, 70);
}

.errortooltip {

    padding: 6px;
    min-width: 240px;
    max-width: 290px;
    background: rgb(210, 181, 226);
    color: red;
    border-radius: 5px;
    min-height: 28px;
}

.icon {
    cursor: pointer;
    height: 20px;
    width: 20px;
}
.fa{
    width: 100%;
}
</style>