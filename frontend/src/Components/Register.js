import React, {useState} from 'react';

function RegisterPage() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        email: ''
    });

    const [submitted, setSumbitted] = useState(false);

    function handleChange(e) {
        const {name, value} = e.target;
        setForm(form => ({...form, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSumbitted(true);

        if (form.firstName && form.lastName && form.userName && form.password && form.email) {
            console.log(form);

            const request = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                }
            };
        
            request.body = JSON.stringify(form);

            fetch('http://localhost:3000/api/register', request)
                .then(res => console.log(res))
                .catch(error => console.log(error));
        }
    }

    return (
        <div>
            <h2>Register page</h2>
            <form name='register' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
                    {submitted && !form.firstName &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
                    {submitted && !form.lastName &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="userName" value={form.userName} onChange={handleChange} />
                    {submitted && !form.userName &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange}/>
                    {submitted && !form.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange}/>
                    {submitted && !form.email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage;