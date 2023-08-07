<template>
  <div
    class="max-w-[400px] mx-auto my-6 bg-white rounded-lg border border-slate-300"
  >
    <div class="py-10 px-10">
      <form @submit.prevent="changePasswordHandler" autocomplete="off">
        <div class="mb-6">
          <h2 class="text-2xl text-center">Change Password</h2>
        </div>
        <div class="flex flex-col gap-2">
          <label class="">
            <span>Old Password</span>
            <div class="">
              <input
                v-model="old_password"
                type="password"
                class="bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full"
                placeholder="*******"
              />
              <span class="text-sm text-red-500">{{ err_old_password }}</span>
            </div>
          </label>
          <label class="">
            <span>New Password</span>
            <div class="">
              <div class="flex items-center justify-center relative">
                <input
                  v-model="new_password"
                  type="password"
                  id="passAction"
                  class="bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full"
                  placeholder="*******"
                  autocomplete="on"
                />
                <Icon
                  class="text-2xl absolute right-2 cursor-pointer text-green-600"
                  v-if="isShow"
                  @click="passwordHandler"
                  name="entypo:eye"
                />
                <Icon
                  class="text-2xl absolute right-2 cursor-pointer"
                  v-else
                  @click="passwordHandler"
                  name="entypo:eye-with-line"
                />
              </div>
              <span class="text-sm text-red-500">{{ err_new_password }}</span>
            </div>
          </label>
          <label class="">
            <span>Confirm Password</span>
            <div class="">
              <input
                v-model="password_confirm"
                type="password"
                class="bg-gray-100 rounded-md focus:outline-none px-2 py-2 w-full"
                placeholder="*******"
              />
              <span class="text-sm text-red-500">{{
                err_password_confirm
              }}</span>
            </div>
          </label>
          <button
            type="submit"
            class="bg-gray-500 hover:bg-gray-600 text-white py-2 mt-4 rounded-md"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// ===========Sweet Alert Use =============//
const { $swal } = useNuxtApp();
const Toast = $swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", $swal.stopTimer);
    toast.addEventListener("mouseleave", $swal.resumeTimer);
  },
});
// ===========Sweet Alert Use =============//


// Password Show / Hide
const isShow = ref(true)

const passwordHandler = () => {
    if (isShow.value === false) {
        document.getElementById('passAction').type = 'password'
        isShow.value = true
    } else {
        document.getElementById('passAction').type = 'text'
        isShow.value = false
    }
}
// Password Show / Hide

const { data: authUser, signOut } = useAuth();
// Change Password Equipment
  const old_password = ref('')
  const new_password = ref('')
  const password_confirm = ref('')
  const err_old_password = ref('')
  const err_new_password = ref('')
  const err_password_confirm = ref('')

  const changePasswordHandler = async (e) => {
    if(old_password.value.length === 0){
      err_old_password.value = 'Old password is required!'
    }else if(new_password.value.length === 0){
      err_new_password.value = 'New password is required!'
    }else if(password_confirm.value.length === 0){
      err_password_confirm.value = 'Confirm password is required!'
    }else{

      if(new_password.value === password_confirm.value){

        // Match Old Password
        const {data:matchOldPass} = await useFetch("/api/frontend/myaccount/cpassword/matchpassword", {
          method: "POST",
          body: {
            old_password: old_password.value
          }
        })
        // Match New Password
        const {data:matchNewPass} = await useFetch("/api/frontend/myaccount/cpassword/matchpassword", {
          method: "POST",
          body: {
            old_password: new_password.value
          }
        })

        if(matchOldPass.value === true){
          if (matchOldPass.value === true && matchNewPass.value === true) {
            Toast.fire({
              icon: "warning",
              title: "Old & new password should not be same!",
            });
          } else {
            const {data:cpsuccess} = await useFetch('/api/frontend/myaccount/cpassword/passwordupdate', {
              method: "PUT",
              body: {
                password: new_password.value
              }
            })
            e.target.reset()
            old_password.value = ''
            new_password.value = ''
            password_confirm.value = ''
            err_new_password.value = ''
            err_old_password.value = ''
            err_password_confirm.value = ''
            Toast.fire({
              icon: "success",
              title: "Password is changed!",
            });
          }
        }else{
         
          Toast.fire({
          icon: "warning",
          title: "Old password incorrect!",
          });
        }
       
      }else{
          Toast.fire({
            icon: "error",
            title: "Confirm password not matched!",
          });
      }

    }
  }

// Change Password Equipment

</script>

<style lang="scss" scoped></style>
