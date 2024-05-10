import type { JSX } from "preact";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  size?: number;
}

function Logo({
  strokeWidth = 16,
  size = 92,
  width = 92,
  height = 18,
  ...otherProps
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 92 18"
      fill="none"
      {...otherProps}
    >
      <rect
        x="0.4198"
        y="0.167557"
        width="91.1604"
        height="17.234"
        fill="url(#pattern0)"
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_9537_2591"
            transform="matrix(0.00657895 0 0 0.0347997 0 -0.0219953)"
          />
        </pattern>
        <image
          id="image0_9537_2591"
          width="152"
          height="30"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAAeCAYAAADQK9fkAAABJmlDQ1BrQ0dDb2xvclNwYWNlQWRvYmVSR0IxOTk4AAAokWNgYFJILCjIYRJgYMjNKykKcndSiIiMUmB/zsDBwMggyMDJIJOYXFzgGBDgwwAEMBoVfLsGVAsEl3VBZmHK4wVcKanFyUD6DxBnJxcUlTAwMGYA2crlJQUgdg+QLZKUDWYvALGLgA4EsreA2OkQ9gmwGgj7DlhNSJAzkP0ByOZLArOZQHbxpUPYAiA21F4QEHRMyU9KVQD5XsPQ0tJCk0Q/EAQlqRUlINo5v6CyKDM9o0TBERhSqQqeecl6OgpGBkbGDAygcIeo/hwIDk9GsTMIMQRAiM2RYGDwX8rAwPIHIWbSy8CwQIeBgX8qQkzNkIFBQJ+BYd+c5NKiMqgxjExAOwnxAelDSjtyHrL6AAAAOGVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAACoAIABAAAAAEAAACYoAMABAAAAAEAAAAeAAAAAPQxad8AAAimSURBVHgB7VoJbBVVFJ2/VCiLpVARRaCCaEAiAaTigmwCGlBRAcUgoiaomEjcWIwJATFGgwkkGgyJAYwEgyYSWVyRNQJJDSUSFMWUNhRbUJaydO94Du0v09f7ZuZNp+2v4Sanf97d38ydt00jVvNRV4QaC9wJ3Ap0B9oD1cC/QC6QDewGdgBuFIFwBtABsB2K63H9j6Pt97IvFMcBCV/0XwBsACTKBHMCkNCXdCReJZgnAfb1AGBqDxNPyoLGvQB/+wAZQBwoAQqBQ8A+YCtwFGj1NAQ9+BS4CPCG+sFv0GMB6SgGgeSHxRuEZsFI9Zfr4oi5qfqm7Tz4WAkEzVlN73kw+IL6zaMaunyBRgGtkvjWfAT47bCqxzdcRyyw44BqM0hn4MGfJvja4WLziKCv5mLSXg1/KS7x3ERjIDwImMRTddfBvotbkGST9UJCvwNqR0zaG106xQI7JvgPWmBPCL62g6ejSRCY9MWPLovkKl1ADX9eiHkUwRdnm1CJo0zY1AcOfwHSXByfgywX4C/XOx2Ba4GuQIKaIreE72T85bp0M8B1qh96F0rzPRTzIf8b4NqPz6M30A6QiPeeUyyn7L2SQhBe2A+Ri+49gK64OOevBnYCpwEn8e3lTR4BvAB0Alh8fPtbA+UgyVdcEo1C1hlgHx8FbgNUug+MicAmVaC0X0ZbV1zcMHFp8hXAnJzEBf9I4FngAUCiXWD2ArgESTpiciwIFRx+xxlm2w/6fCgSJeMUuUVK1IU3FzL1PrHNF9SNBkAo2ZG3BuCL6YcmQeksIPk65MdBc+tI6xgmfxTg8BsmJWOBbQvQwQ9hIz1gjjQ64g5bslmoM3Dh94SMRxeSv1dd7FpExPMdNVHO/dc3QTb/lwLjkqJMuG/3aO4ZRx31HrO9WqPvh30TlCSfpeCbbjoaxNNNQQ0UPRgPQy69dXPAT8q53KM/zSU+j0C5QrA0gUfWAoHPaW6mwPfLOgLFNwTlNuA9JfCNWGEVmJQIC4uLzSvkfgc4eqhUoTLQ7gFkCfwlAs+UtRQGnIFUelJlmLbDKrDRQuCFAu8Kq/4d4BTZuz7rUqtA4I0XeFyC8GtAGPRJrRPndHl3Yx3Hdy+fNNWKRFAgEX468E2VVZVW/8wM+/vs/PTp7/yYLhhOBG8QwKMGU2LhHwBWmBq2Mv33ka+6zuGUd1jox1CBx/PGYoFvzHptysDNkWiERx81I2rN3zYjB3f/on/P9BP5RcWReMz0VMuOwiI6FT4fS/j1m1k8FrNKyiqs4gvlOhOuyxpDv8K4NRUYF+smxF3ai4LBZ+BxZFKJ/xygEl/CUGjelEFHKqM2Bxm+3HV0qrhscl7hOSslzn1VTdXVCX1cxK1o9XHLDjLI4ONZLGIVnS7xESaQSl4gq5Yz4vlTX014Phk+OB7XDASmA8MAiRZLTPD4tUMlni+GQmcLi04XWW3PwFln1WFKvF7NqWLXdhzFleqq0XLC9i0XOlDkO2D1RyDLy0bcLJ243Kx3Ffwp13Ojb3RITWmwTCotr7LKK6qsaDTYIBS3InZJkBGsutq2YtGofeN1HXWReY7Cra5Oru9pjeSCh4Lk13wMrwki2Un+PVJqlJifxzg96ohHGip1UxlB28fK4x1TrAqOwnVk27aVkZZqnS+psEvKKiNBiixuxyoWRqvbfGBXxaSbXBdMvWiHcS8ei9jb9xfw29o3qhxtbnGzgSAPijYXAVMy6oOH8zB9uYX6FsK3AC7Y3Ygn7ipxug2Fpry9NTMWvfSPiXX+bKy5xg/t/tCy2cNzcovOR0o5ZBhQJFYV5NmLEbjz4QNxQlrAisYBmblKPMYeHtDXTMGX9NIk3OtO1J3997qm/8yEQx+/c6Cj+uRmIN2HrR+VuYJ/w5JqGMZ039nQQw1nB34eVITz0V6h8MJssqhV6gXGLpXpo007lUy/QPwJB8tUJ7Vt/vfDLYqMMY8qPLcmRzqVuLWbBbynCgK06UelIPdS9RFK+3F4Ud8utp8Oxbvs5Esh5hpZ1ZO7W/D1uouVNIJtctHnKbx0f3JcbCQRz8dUP9KLJtm68XBU1cAv48x0M2pOGedaaZrkOqpTEyUyD37Vm82NAd9qE+oGZdUP2yNcnEgFts1Fn6KXACnOEg87p5ijjORjrVPJ8Jq7dd2zSzH01aTqz8G71PmD4Ov+i7IxCfXTxEt88vDrm1OPmvcZ8NyOBYIUGPPZKsRi7CwKfdJJ6Kn5sr3Ip71TjQW0H5D8cVpPOtIly/XJMMNsOa24PWS6ywGkm8MFqx/ipxrJfqmHcdAC6wC/pUJMFg1nAT80FkpSzuRxiXC1HyfQGQIcAiRf/IqSlHQNsuJ5jZQ0eRxdRgC6zUUmZM8Ae4HtgFeBjYKOLtbXkI0B1FhtwZsA/ATobDtB5kZBC4w+JwJS3PVuARXZco0P+i0C3gRuBlTi8mE4sBKQciCPn7y4bEha4tlMBaDrAPkFABfWXBhvqb0+gl+nzQ9o+6FVUHLaqdfHIN8DcHpi4fIBqDrONgvcixpTYPS9CnDGTFxP8wrskH+u8ZHwxV+OULyPvM+7AN4Lp1y95kl+FpD0NAAZsojUDpi0Nxr0ksVq4luny5HBDzW2wBijEJDyyPCTQK3Oxxofkl8vHj9RDTaI3eKqnGbWAl4d08kPGPZgXSNiMYcFBvHCKLDbNfnuM8iDqhxxTwG6++iHz+m5C9AqaTSy5mjkp6MJHY5+swP0dipssg1jbYA+H7YJzYByItfEb56Jg1rdxYIf+uMD53rJL6VDcQmQDyTy8fPL5ck4oMko0mSeGzruCxY7cxfAU+2uQCrAef8scBzg97idAD+jlANBiQtZFjb/Sa8HkAakACUA3/a/AK7LvgMOA6bEBfTkWiM+SN5HFhhHbFOaAwOeRdEPKQpwt7kI4I7ThOJQvh8YCXC6uwFg3+mTfedulTv6n4GgfYepf/oPD3ccytNuIL8AAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
}

export default Logo;
